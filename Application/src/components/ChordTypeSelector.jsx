import { useState, useEffect } from 'react';

function ChordTypeSelector({ selectedMode, onChordTypesChange }) {
  const [selectedTypes, setSelectedTypes] = useState({
    simpleTriads: true,
    diminishedChords: false,
    augmentedChords: false,
    seventhChords: true,
    minorMajorSeventh: false,
    dominantSeventh: false,
    subdominantType: 'major', // 'major', 'both', or 'minor'
    leadingToneType: 'diminished', // 'diminished' or 'flat7'
    minorDominantType: 'minor', // 'minor', 'major', or 'both'
    minorSeventhType: 'flat7' // 'flat7', 'diminished', or 'both'
  });

  // Reset chord types when mode changes
  useEffect(() => {
    const defaultTypes = {
      simpleTriads: true,
      diminishedChords: false,
      augmentedChords: false,
      seventhChords: true,
      minorMajorSeventh: false,
      dominantSeventh: false,
      subdominantType: 'major',
      leadingToneType: 'diminished',
      minorDominantType: 'minor',
      minorSeventhType: 'flat7'
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

  const handleBorrowedChordChange = (value) => {
    setSelectedTypes(prev => {
      const newState = { ...prev, subdominantType: value };
      onChordTypesChange(newState);
      return newState;
    });
  };

  const handleLeadingToneChange = (value) => {
    setSelectedTypes(prev => {
      const newState = { ...prev, leadingToneType: value };
      onChordTypesChange(newState);
      return newState;
    });
  };

  const handleMinorDominantChange = (value) => {
    setSelectedTypes(prev => {
      const newState = { ...prev, minorDominantType: value };
      onChordTypesChange(newState);
      return newState;
    });
  };

  const handleMinorSeventhChange = (value) => {
    setSelectedTypes(prev => {
      const newState = { ...prev, minorSeventhType: value };
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
        description: 'All 7th chords',
        enabled: selectedTypes.seventhChords,
        disabled: false
      }
    ];

    // Add dominant 7th toggle only for major mode
    const majorOptions = [
      ...baseOptions,
      {
        id: 'dominantSeventh',
        label: 'Dominant 7th',
        description: 'Allow dominant 7th chords',
        enabled: selectedTypes.dominantSeventh,
        disabled: selectedTypes.seventhChords
      },
      {
        id: 'subdominantSelector',
        type: 'subdominant',
        label: 'Subdominant',
        description: 'Choose whether to use major IV, minor iv, or both',
        value: selectedTypes.subdominantType,
        onChange: handleBorrowedChordChange
      },
      {
        id: 'leadingToneSelector',
        type: 'leadingTone',
        label: 'Leading Tone',
        description: 'Choose whether to use vii° or bVII',
        value: selectedTypes.leadingToneType,
        onChange: handleLeadingToneChange
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
        description: 'Minor chords with major 7th',
        enabled: selectedTypes.minorMajorSeventh,
        disabled: !selectedTypes.seventhChords
      }
    ];

    const minorOptions = [
      ...baseOptions,
      {
        id: 'minorDominantSelector',
        type: 'minorDominant',
        label: 'Dominant',
        description: 'Choose whether to use minor v, major V, or both',
        value: selectedTypes.minorDominantType,
        onChange: handleMinorDominantChange
      },
      {
        id: 'minorSeventhSelector',
        type: 'minorSeventh',
        label: 'Subtonic',
        description: 'Choose whether to use bVII or vii°',
        value: selectedTypes.minorSeventhType,
        onChange: handleMinorSeventhChange
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
          options: minorOptions
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
            {option.type === 'subdominant' ? (
              <div className="borrowed-chord-selector">
                <div className="option-header">
                  <label>{option.label}</label>
                </div>
                <p className="option-description">{option.description}</p>
                <div className="borrowed-chord-options">
                  <label>
                    <input
                      type="radio"
                      name="subdominant"
                      value="major"
                      checked={option.value === 'major'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Major IV
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="subdominant"
                      value="both"
                      checked={option.value === 'both'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Both
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="subdominant"
                      value="minor"
                      checked={option.value === 'minor'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Minor iv
                  </label>
                </div>
              </div>
            ) : option.type === 'leadingTone' ? (
              <div className="borrowed-chord-selector">
                <div className="option-header">
                  <label>{option.label}</label>
                </div>
                <p className="option-description">{option.description}</p>
                <div className="borrowed-chord-options">
                  <label>
                    <input
                      type="radio"
                      name="leadingTone"
                      value="diminished"
                      checked={option.value === 'diminished'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Diminished vii°
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="leadingTone"
                      value="both"
                      checked={option.value === 'both'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Both
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="leadingTone"
                      value="flat7"
                      checked={option.value === 'flat7'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Flat bVII
                  </label>
                </div>
              </div>
            ) : option.type === 'minorDominant' ? (
              <div className="borrowed-chord-selector">
                <div className="option-header">
                  <label>{option.label}</label>
                </div>
                <p className="option-description">{option.description}</p>
                <div className="borrowed-chord-options">
                  <label>
                    <input
                      type="radio"
                      name="minorDominant"
                      value="minor"
                      checked={option.value === 'minor'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Minor v
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="minorDominant"
                      value="both"
                      checked={option.value === 'both'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Both
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="minorDominant"
                      value="major"
                      checked={option.value === 'major'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Major V
                  </label>
                </div>
              </div>
            ) : option.type === 'minorSeventh' ? (
              <div className="borrowed-chord-selector">
                <div className="option-header">
                  <label>{option.label}</label>
                </div>
                <p className="option-description">{option.description}</p>
                <div className="borrowed-chord-options">
                  <label>
                    <input
                      type="radio"
                      name="minorSeventh"
                      value="flat7"
                      checked={option.value === 'flat7'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Flat VII
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="minorSeventh"
                      value="both"
                      checked={option.value === 'both'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Both
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="minorSeventh"
                      value="diminished"
                      checked={option.value === 'diminished'}
                      onChange={(e) => option.onChange(e.target.value)}
                    />
                    Diminished vii°
                  </label>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChordTypeSelector; 