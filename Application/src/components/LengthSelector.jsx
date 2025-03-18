import React from 'react';

const LENGTHS = [
  { value: 'random', label: 'Random' },
  { value: '1', label: '1 Bar' },
  { value: '2', label: '2 Bars' },
  { value: '3', label: '3 Bars' },
  { value: '4', label: '4 Bars' },
  { value: '5', label: '5 Bars' },
  { value: '6', label: '6 Bars' },
  { value: '7', label: '7 Bars' },
  { value: '8', label: '8 Bars' }
];

function LengthSelector({ selectedLength, onLengthChange }) {
  return (
    <div className="select-group">
      <label htmlFor="length-select">Length:</label>
      <select 
        id="length-select" 
        value={selectedLength} 
        onChange={(e) => onLengthChange(e.target.value)}
      >
        {LENGTHS.map(length => (
          <option key={length.value} value={length.value}>
            {length.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LengthSelector; 