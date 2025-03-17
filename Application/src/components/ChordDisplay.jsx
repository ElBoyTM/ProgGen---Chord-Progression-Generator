import React from 'react';

function ChordDisplay({ progression }) {
  if (!progression || progression.length === 0) {
    return (
      <div className="chord-display">
        <div className="chord-placeholder">Click the button to generate a progression</div>
      </div>
    );
  }

  return (
    <div className="chord-display">
      <div className="chord-progression">
        {progression.map((chord, index) => (
          <div key={index} className="chord-box">
            <div className="chord-name">{chord}</div>
            <div className="chord-number">{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChordDisplay; 