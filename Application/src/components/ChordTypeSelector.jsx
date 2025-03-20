import { useState } from 'react';

function ChordTypeSelector({ selectedMode }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  // This will be expanded later with mode-specific options
  const getModeOptions = (mode) => {
    switch (mode) {
      case 'chromatic':
        return {
          name: 'Chromatic Mode',
          description: 'Select which types of chords to include in your progression',
          options: [] // Will be filled in later
        };
      case 'major':
        return {
          name: 'Major Mode',
          description: 'Select which types of chords to include in your progression',
          options: [] // Will be filled in later
        };
      // Add other modes as needed
      default:
        return {
          name: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`,
          description: 'Select which types of chords to include in your progression',
          options: [] // Will be filled in later
        };
    }
  };

  const modeOptions = getModeOptions(selectedMode);

  return (
    <div className="chord-type-selector">
      <h3>{modeOptions.name}</h3>
      <p className="description">{modeOptions.description}</p>
      <div className="options-container">
        {/* Options will be added here based on the mode */}
      </div>
    </div>
  );
}

export default ChordTypeSelector; 