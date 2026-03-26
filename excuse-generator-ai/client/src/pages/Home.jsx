import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import ModeToggle from '../components/ModeToggle';
import OutputCard from '../components/OutputCard';
import Loader from '../components/Loader';
import { createExcuse, fetchPreviousExcuses } from '../services/api';

const Home = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('Normal');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [recentExcuses, setRecentExcuses] = useState([]);

  // Load past excuses on mount
  useEffect(() => {
    loadRecent();
  }, []);

  const loadRecent = async () => {
    try {
      const past = await fetchPreviousExcuses(3);
      setRecentExcuses(past);
    } catch (e) {
      console.warn('Could not load past excuses', e);
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please provide a situation first!');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const generated = await createExcuse(input, mode);
      setOutput(generated);
      // Refresh the recent list in the background
      loadRecent();
    } catch (err) {
      setError(err.message || 'Something went wrong while generating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header className="app-header fade-in">
        <h1>Excuse Generator AI</h1>
        <p>Your personal AI to get out of anything.</p>
      </header>
      
      <main className="main-content">
        <section className="input-section glass-panel fade-in" style={{ animationDelay: '0.1s' }}>
          <InputBox value={input} onChange={setInput} />
          <ModeToggle selectedMode={mode} onSelect={setMode} />
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            className="generate-btn" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Excuse'}
          </button>
        </section>

        <section className="output-section">
          {loading ? (
            <Loader className="main-loader" />
          ) : (
            output && <OutputCard excuse={output} tone={mode} onRegenerate={handleGenerate} />
          )}
        </section>

        {recentExcuses?.length > 0 && (
          <section className="history-section fade-in" style={{ animationDelay: '0.2s' }}>
            <h3>Recent Excuses</h3>
            <ul className="history-list">
              {recentExcuses.map((exc) => (
                <li key={exc.id || exc.created_at} className="history-item">
                  <div className="history-item-header">
                    <span className="history-tone">{exc.mode}</span>
                    <span className="history-input">"{exc.input}"</span>
                  </div>
                  <p className="history-response">{exc.response}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
