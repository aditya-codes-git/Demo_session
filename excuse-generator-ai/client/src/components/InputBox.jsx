import React from 'react';

const InputBox = ({ value, onChange }) => {
  return (
    <div className="input-box">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Why do you need an excuse? (e.g., I missed class because...)"
        rows={4}
      />
    </div>
  );
};

export default InputBox;
