import React from 'react';
import { Meh, Drama, Briefcase, Smile, Zap } from 'lucide-react';

const modes = [
  { id: 'Normal', icon: Meh },
  { id: 'Overdramatic', icon: Drama },
  { id: 'Professional', icon: Briefcase },
  { id: 'Funny', icon: Smile },
  { id: 'Savage', icon: Zap },
];

const ModeToggle = ({ selectedMode, onSelect }) => {
  return (
    <div className="mode-toggle">
      {modes.map((mode) => {
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            className={`mode-btn ${selectedMode === mode.id ? 'active' : ''}`}
            onClick={() => onSelect(mode.id)}
            type="button"
          >
            <Icon size={18} />
            <span>{mode.id}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ModeToggle;
