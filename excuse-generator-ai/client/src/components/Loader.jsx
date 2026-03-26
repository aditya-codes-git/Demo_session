import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ className }) => {
  return (
    <div className={`loader-container ${className || ''}`}>
      <Loader2 className="spinner" size={24} />
      <span>Generating excuse...</span>
    </div>
  );
};

export default Loader;
