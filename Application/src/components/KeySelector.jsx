import React from 'react';

const KEYS = [
  { value: '', label: 'No Key' },
  { value: 'C', label: 'C' },
  { value: 'G', label: 'G' },
  { value: 'D', label: 'D' },
  { value: 'A', label: 'A' },
  { value: 'E', label: 'E' },
  { value: 'B', label: 'B' },
  { value: 'F#', label: 'F♯' },
  { value: 'C#', label: 'C♯' },
  { value: 'G#', label: 'G♯' },
  { value: 'D#', label: 'D♯' },
  { value: 'A#', label: 'A♯' },
  { value: 'F', label: 'F' },
  { value: 'Bb', label: 'B♭' },
  { value: 'Eb', label: 'E♭' },
  { value: 'Ab', label: 'A♭' },
  { value: 'Db', label: 'D♭' },
  { value: 'Gb', label: 'G♭' },
  { value: 'Cb', label: 'C♭' }
];

function KeySelector({ selectedKey, onKeyChange }) {
  return (
    <div className="key-selector">
      <label htmlFor="key-select">Key:</label>
      <select 
        id="key-select" 
        value={selectedKey} 
        onChange={(e) => onKeyChange(e.target.value)}
      >
        {KEYS.map(key => (
          <option key={key.value} value={key.value}>
            {key.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default KeySelector; 