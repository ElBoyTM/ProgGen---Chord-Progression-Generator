import { useState, useEffect } from 'react';

function ChordTypeSelector({ selectedMode, onChordTypesChange }) {
  const [selectedTypes, setSelectedTypes] = useState({
    simpleTriads: true,
    diminishedChords: false,
    augmentedChords: false,
    seventhChords: true
  });

  const handleToggle = (type) => {
    setSelectedTypes(prev => {
      const newState = { ...prev };
      
      if (type === 'simpleTriads') {
        // When simpleTriads is toggled off, don't affect other toggles
        newState.simpleTriads = !prev.simpleTriads;
      } else {
        // For other toggles, just toggle their state
        newState[type] = !prev[type];
      }
      
      onChordTypesChange(newState);
      return newState;
    });
  };

  // Notify parent of initial state
  useEffect(() => {
    onChordTypesChange(selectedTypes);
  }, []);

  const getModeOptions = (mode) => {
    switch (mode) {
      case 'chromatic':
        return {
          name: 'Chromatic Mode',
          description: 'Select which types of chords to include in your progression',
          options: [
            {
              id: 'simpleTriads',
              label: 'Triads',
              description: 'Major, minor, diminished, and augmented triads',
              enabled: selectedTypes.simpleTriads
            },
            {
              id: 'diminishedChords',
              label: 'Diminished Chords',
              description: 'Diminished triads and seventh chords',
              enabled: selectedTypes.diminishedChords
            },
            {
              id: 'augmentedChords',
              label: 'Augmented Chords',
              description: 'Augmented triads and seventh chords',
              enabled: selectedTypes.augmentedChords
            },
            {
              id: 'seventhChords',
              label: 'Seventh Chords',
              description: 'Major 7, minor 7, and dominant 7 chords',
              enabled: selectedTypes.seventhChords
            }
          ]
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
        {modeOptions.options.map(option => (
          <div key={option.id} className="option-item">
            <div className="option-header">
              <input
                type="checkbox"
                id={option.id}
                checked={option.enabled}
                onChange={() => handleToggle(option.id)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
            <p className="option-description">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChordTypeSelector; 