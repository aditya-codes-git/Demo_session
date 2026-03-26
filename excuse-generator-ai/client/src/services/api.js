import { generateExcuse } from './gemini';
import { supabase } from './supabase';

export const fetchPreviousExcuses = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('excuses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching past excuses (or table not yet created):', error);
    return [];
  }
};

export const createExcuse = async (input, mode) => {
  try {
    // 1. Fetch past data for context (memory)
    const pastExcuses = await fetchPreviousExcuses(3);
    
    // 2. Call AI with input and past context
    const responseText = await generateExcuse(input, mode, pastExcuses);
    
    if (!responseText) throw new Error("AI returned empty response");

    // 3. Store in DB (action)
    const { data, error } = await supabase
      .from('excuses')
      .insert([{
        input: input,
        response: responseText,
        mode: mode
      }])
      .select();

    if (error) {
      console.error('Error inserting into DB (or table not created):', error);
      // Still return the generated text even if insert fails
    } else {
      console.log('Action: Automatically stored in database', data);
    }

    return responseText;
  } catch (err) {
    console.error('Error creating excuse:', err);
    throw err; // UI will handle it
  }
};
