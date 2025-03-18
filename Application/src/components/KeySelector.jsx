import React from 'react';

const ROOT_NOTES = [
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

const MODES = [
  { value: 'chromatic', label: 'Chromatic' },
  { value: 'major', label: 'Major (Ionian)' },
  { value: 'dorian', label: 'Dorian' },
  { value: 'phrygian', label: 'Phrygian' },
  { value: 'lydian', label: 'Lydian' },
  { value: 'mixolydian', label: 'Mixolydian' },
  { value: 'minor', label: 'Minor (Aeolian)' },
  { value: 'locrian', label: 'Locrian' }
];

function KeySelector({ selectedKey, selectedMode, onKeyChange, onModeChange }) {
  return (
    <div className="key-selector">
      <div className="select-group">
        <label htmlFor="key-select">Root Note:</label>
        <select 
          id="key-select" 
          value={selectedKey} 
          onChange={(e) => onKeyChange(e.target.value)}
        >
          {ROOT_NOTES.map(key => (
            <option key={key.value} value={key.value}>
              {key.label}
            </option>
          ))}
        </select>
      </div>
      <div className="select-group">
        <label htmlFor="mode-select">Mode:</label>
        <select 
          id="mode-select" 
          value={selectedMode} 
          onChange={(e) => onModeChange(e.target.value)}
        >
          {MODES.map(mode => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default KeySelector; 