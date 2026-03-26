import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const OutputCard = ({ excuse, tone, onRegenerate }) => {
  if (!excuse) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(excuse);
  };

  return (
    <div className="output-card fade-in">
      <div className="output-header">
        <span className="output-tone">{tone} Tone</span>
        <div className="output-actions">
          <button onClick={handleCopy} title="Copy" className="action-btn">
            <Copy size={16} />
          </button>
          <button onClick={onRegenerate} title="Regenerate" className="action-btn">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      <p className="output-content">{excuse}</p>
      <div className="output-footer">
        <span className="uniqueness-note">✨ Generated uniquely for you</span>
      </div>
    </div>
  );
};

export default OutputCard;
