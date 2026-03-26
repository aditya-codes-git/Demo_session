import { GoogleGenAI } from '@google/genai';

// Initialize the API using the new @google/genai SDK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Fail gracefully or init only if key exists
let ai = null;
if (apiKey && apiKey !== 'your_gemini_api_key') {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const generateExcuse = async (input, mode, pastExcuses) => {
  if (!ai) {
    throw new Error("Missing Gemini API key in .env");
  }

  const pastExcusesText = pastExcuses?.length > 0
    ? `Avoid repeating these past excuses:\n${pastExcuses.map((e, i) => `${i + 1}. ${e.response}`).join('\n')}`
    : "No past excuses context provided.";

  const prompt = `
You are the "Excuse Generator AI". 
The user is providing an input situation: "${input}".
You need to generate an excuse for this situation.

Tone required: ${mode}

Instructions:
1. Keep the response relatively short (1-3 sentences max).
2. Fully embrace the requested tone (${mode}). 
   - Normal: A plausible, standard excuse.
   - Overdramatic: Highly exaggerated, extremely emotional or chaotic.
   - Professional: Formal, polite, and suitable for a workplace.
   - Funny: Humorous, witty, or slightly absurd.
   - Savage: Direct, unapologetic, and brutally honest.
3. Only output the actual excuse. No intro texts.
4. Ensure uniqueness. ${pastExcusesText}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw new Error("Failed to generate excuse from Gemini API.");
  }
};
