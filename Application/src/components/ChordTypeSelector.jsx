import { useState, useEffect } from 'react';

function ChordTypeSelector({ selectedMode, onChordTypesChange }) {
  const [selectedTypes, setSelectedTypes] = useState({
    simpleTriads: true,
    diminishedChords: false,
    augmentedChords: false,
    seventhChords: true,
    minorMajorSeventh: false,
    dominantSeventh: false
  });

  // Reset chord types when mode changes
  useEffect(() => {
    const defaultTypes = {
      simpleTriads: true,
      diminishedChords: false,
      augmentedChords: false,
      seventhChords: true,
      minorMajorSeventh: false,
      dominantSeventh: false
    };
    setSelectedTypes(defaultTypes);
    onChordTypesChange(defaultTypes);
  }, [selectedMode]);

  const handleToggle = (type) => {
    setSelectedTypes(prev => {
      const newState = { ...prev };
      
      if (type === 'simpleTriads') {
        // When simpleTriads is toggled off, don't affect other toggles
        newState.simpleTriads = !prev.simpleTriads;
      } else if (type === 'seventhChords') {
        // When seventh chords are toggled off, also uncheck mM7
        newState.seventhChords = !prev.seventhChords;
        if (!newState.seventhChords) {
          newState.minorMajorSeventh = false;
          newState.dominantSeventh = false;
        }
      } else {
        // For other toggles, just toggle their state
        newState[type] = !prev[type];
      }
      
      onChordTypesChange(newState);
      return newState;
    });
  };

  const getModeOptions = (mode) => {
    const baseOptions = [
      {
        id: 'simpleTriads',
        label: 'Triads',
        description: 'Basic major and minor triads',
        enabled: selectedTypes.simpleTriads,
        disabled: false
      },
      {
        id: 'diminishedChords',
        label: 'Diminished Chords',
        description: 'Diminished triads and seventh chords',
        enabled: selectedTypes.diminishedChords,
        disabled: false
      },
      {
        id: 'seventhChords',
        label: 'Seventh Chords',
        description: 'Major 7th, minor 7th, and dominant 7th chords',
        enabled: selectedTypes.seventhChords,
        disabled: false
      }
    ];

    // Add dominant 7th toggle only for major mode
    const majorOptions = [
      ...baseOptions,
      {
        id: 'dominantSeventh',
        label: 'Dominant 7th Only',
        description: 'Allow dominant 7th chords (e.g., C7)',
        enabled: selectedTypes.dominantSeventh,
        disabled: selectedTypes.seventhChords
      }
    ];

    const chromaticOptions = [
      ...baseOptions,
      {
        id: 'augmentedChords',
        label: 'Augmented Chords',
        description: 'Augmented triads and seventh chords',
        enabled: selectedTypes.augmentedChords,
        disabled: false
      },
      {
        id: 'minorMajorSeventh',
        label: 'Minor-Major 7th',
        description: 'Minor chords with major 7th (e.g., CmM7)',
        enabled: selectedTypes.minorMajorSeventh,
        disabled: !selectedTypes.seventhChords
      }
    ];

    switch (mode) {
      case 'chromatic':
        return {
          name: 'Chromatic Mode',
          description: 'Select which types of chords to include in your progression',
          options: chromaticOptions
        };
      case 'major':
        return {
          name: 'Major Mode',
          description: 'Select which types of chords to include in your progression',
          options: majorOptions
        };
      case 'minor':
        return {
          name: 'Minor Mode',
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
        };
      case 'dorian':
        return {
          name: 'Dorian Mode',
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
        };
      case 'phrygian':
        return {
          name: 'Phrygian Mode',
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
        };
      case 'lydian':
        return {
          name: 'Lydian Mode',
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
        };
      case 'mixolydian':
        return {
          name: 'Mixolydian Mode',
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
        };
      case 'locrian':
        return {
          name: 'Locrian Mode',
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
        };
      default:
        return {
          name: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`,
          description: 'Select which types of chords to include in your progression',
          options: baseOptions
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
                disabled={option.disabled}
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