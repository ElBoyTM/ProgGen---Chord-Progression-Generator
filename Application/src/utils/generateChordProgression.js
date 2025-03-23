import { Scale, Chord } from 'tonal';

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const MODE_CHORD_TYPES = {
  major: [
    ['major', 'maj7'], // I
    ['minor', 'm7'],   // ii
    ['minor', 'm7'],   // iii
    ['major', 'minor', 'maj7', 'mM7'], // IV (can be major or minor)
    ['major', '7'],    // V
    ['minor', 'm7'],   // vi
    ['dim', 'm7b5', 'major', 'maj7']    // vii° or bVII
  ],
  minor: [
    ['minor', 'm7'],   // i
    ['dim', 'm7b5'],   // ii°
    ['major', 'maj7'], // III
    ['minor', 'm7'],   // iv
    ['minor', 'm7'],   // v
    ['major', 'maj7'], // VI
    ['major', '7']     // VII
  ],
  dorian: [
    ['minor', 'm7'],   // i
    ['minor', 'm7'],   // ii
    ['major', 'maj7'], // III
    ['major', '7'],    // IV
    ['minor', 'm7'],   // v
    ['dim', 'm7b5'],   // vi°
    ['major', 'maj7']  // VII
  ],
  phrygian: [
    ['minor', 'm7'],   // i
    ['major', 'maj7'], // II
    ['major', '7'],    // III
    ['minor', 'm7'],   // iv
    ['dim', 'm7b5'],   // v°
    ['major', 'maj7'], // VI
    ['minor', 'm7']    // vii
  ],
  lydian: [
    ['major', 'maj7'], // I
    ['major', '7'],    // II
    ['minor', 'm7'],   // iii
    ['dim', 'm7b5'],   // iv°
    ['major', 'maj7'], // V
    ['minor', 'm7'],   // vi
    ['minor', 'm7']    // vii
  ],
  mixolydian: [
    ['major', '7'],    // I
    ['minor', 'm7'],   // ii
    ['dim', 'm7b5'],   // iii°
    ['major', 'maj7'], // IV
    ['minor', 'm7'],   // v
    ['minor', 'm7'],   // vi
    ['major', 'maj7']  // VII
  ],
  locrian: [
    ['dim', 'm7b5'],   // i°
    ['major', 'maj7'], // II
    ['minor', 'm7'],   // iii
    ['minor', 'm7'],   // iv
    ['major', 'maj7'], // V
    ['major', '7'],    // VI
    ['minor', 'm7']    // vii
  ]
};

export function generateChordProgression(key, mode, length, startOnTonic, selectedChordTypes) {
  // If no key is provided or mode is chromatic, generate random chromatic progression
  if (!key || mode === 'chromatic') {
    const allowedChords = [];
    
    // Add chords based on selected types
    if (selectedChordTypes.simpleTriads) {
      allowedChords.push('major', 'minor');
    }
    if (selectedChordTypes.diminishedChords) {
      if (selectedChordTypes.simpleTriads) {
        allowedChords.push('dim');
      }
      allowedChords.push('dim7', 'm7b5');
    }
    if (selectedChordTypes.augmentedChords) {
      if (selectedChordTypes.simpleTriads) {
        allowedChords.push('aug');
      }
      allowedChords.push('aug7', 'maj7#5');
    }
    if (selectedChordTypes.seventhChords) {
      allowedChords.push('7', 'm7', 'maj7');
    }
    if (selectedChordTypes.minorMajorSeventh) {
      allowedChords.push('mM7');
    }

    // If no chord types are selected, default to all types
    if (allowedChords.length === 0) {
      allowedChords.push('major', 'minor', 'dim', 'aug', '7', 'm7', 'maj7', 'dim7', 'mM7', 'm7b5', 'aug7', 'maj7#5');
    }

    const progression = [];
    const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // Generate the progression
    for (let i = 0; i < length; i++) {
      const randomRoot = scale[Math.floor(Math.random() * scale.length)];
      const randomType = allowedChords[Math.floor(Math.random() * allowedChords.length)];
      const chord = `${randomRoot}${randomType}`;
      
      // Ensure the chord is valid
      if (Chord.get(chord).notes.length > 0) {
        progression.push(chord);
      } else {
        i--; // Try again if the chord is invalid
      }
    }

    return progression;
  }

  // Get the scale notes for the given key and mode
  const scale = Scale.get(`${key} ${mode}`);
  const scaleNotes = scale.notes;

  // Get the chord types for the current mode
  const chordTypes = MODE_CHORD_TYPES[mode] || MODE_CHORD_TYPES.major;

  // Create array of available scale positions (0-6)
  // Filter out positions that would result in diminished chords when diminished toggle is off
  const availablePositions = Array.from({ length: scaleNotes.length }, (_, i) => i).filter(pos => {
    if (!selectedChordTypes.diminishedChords) {
      // Check if this position has any diminished chord types
      return !chordTypes[pos].some(type => type === 'dim' || type === 'dim7' || type === 'm7b5');
    }
    return true;
  });

  // If no positions are available after filtering, add back all positions
  if (availablePositions.length === 0) {
    availablePositions.push(...Array.from({ length: scaleNotes.length }, (_, i) => i));
  }

  // Get the root note for a position, handling bVII in major mode
  const getRootNote = (position) => {
    if (mode === 'major' && position === 6) { // vii position
      if (selectedChordTypes.leadingToneType === 'flat7') {
        // For bVII, we need to lower the root note by a semitone
        const currentNote = scaleNotes[position];
        const currentIndex = ALL_NOTES.indexOf(currentNote);
        const loweredNote = ALL_NOTES[(currentIndex - 1 + 12) % 12];
        
        // Handle enharmonic equivalents based on key signature
        const isSharpKey = key.includes('#');
        
        // Special handling for F# major
        if (key === 'F#') {
          // In F# major, E# becomes E for bVII
          if (currentNote === 'E#') {
            return 'E';
          }
        }
        
        // Handle other enharmonic equivalents
        if (isSharpKey) {
          // In sharp keys, prefer sharp notes
          const sharpMap = {
            'Bb': 'A#',
            'Db': 'C#',
            'Eb': 'D#',
            'Gb': 'F#',
            'Ab': 'G#'
          };
          return sharpMap[loweredNote] || loweredNote;
        } else {
          // In flat keys or natural keys, prefer flat notes
          const flatMap = {
            'A#': 'Bb',
            'C#': 'Db',
            'D#': 'Eb',
            'F#': 'Gb',
            'G#': 'Ab'
          };
          return flatMap[loweredNote] || loweredNote;
        }
      }
    }
    return scaleNotes[position];
  };

  // Filter chord types based on user selection
  const filterChordTypes = (types, position) => {
    return types.filter(type => {
      // Handle triad types based on simpleTriads toggle
      if (type === 'major' || type === 'minor') {
        // Special handling for III in major mode - must be minor
        if (mode === 'major' && position === 2) { // III is at position 2
          return type === 'minor' && selectedChordTypes.simpleTriads;
        }
        // Special handling for IV/iv in major mode
        if (mode === 'major' && position === 3) { // IV is at position 3
          if (selectedChordTypes.borrowedChordType === 'major') {
            return type === 'major' && selectedChordTypes.simpleTriads;
          } else if (selectedChordTypes.borrowedChordType === 'minor') {
            return type === 'minor' && selectedChordTypes.simpleTriads;
          } else { // 'both'
            return selectedChordTypes.simpleTriads;
          }
        }
        // Special handling for vii/bVII in major mode
        if (mode === 'major' && position === 6) { // vii is at position 6
          if (selectedChordTypes.leadingToneType === 'diminished') {
            return false; // Don't allow major/minor when using diminished
          } else if (selectedChordTypes.leadingToneType === 'flat7') {
            return type === 'major' && selectedChordTypes.simpleTriads;
          } else { // 'both'
            return type === 'major' && selectedChordTypes.simpleTriads;
          }
        }
        return selectedChordTypes.simpleTriads;
      }
      if (type === 'dim') {
        // For diminished triads, require both toggles to be on
        if (mode === 'major' && position === 6) { // vii position
          return selectedChordTypes.diminishedChords && 
                 selectedChordTypes.simpleTriads && 
                 selectedChordTypes.leadingToneType === 'diminished';
        }
        return selectedChordTypes.diminishedChords && selectedChordTypes.simpleTriads;
      }
      if (type === 'aug') {
        // For augmented triads, require both toggles to be on
        return selectedChordTypes.augmentedChords && selectedChordTypes.simpleTriads;
      }
      // Handle seventh chord variations
      if (type === 'dim7' || type === 'm7b5') {
        // For diminished seventh chords, only require diminished toggle
        if (mode === 'major' && position === 6) { // vii position
          return selectedChordTypes.diminishedChords && 
                 selectedChordTypes.leadingToneType === 'diminished';
        }
        return selectedChordTypes.diminishedChords;
      }
      if (type === 'aug7' || type === 'maj7#5') {
        // For augmented seventh chords, only require augmented toggle
        return selectedChordTypes.augmentedChords;
      }
      // Basic seventh chords
      if (type === '7') {
        // Special handling for vii/bVII in major mode
        if (mode === 'major' && position === 6) {
          if (selectedChordTypes.leadingToneType === 'diminished') {
            return false; // Don't allow dominant 7th when using diminished
          } else { // 'flat7'
            return selectedChordTypes.seventhChords || selectedChordTypes.dominantSeventh;
          }
        }
        // Dominant 7th can be enabled by either seventhChords or dominantSeventh
        return selectedChordTypes.seventhChords || selectedChordTypes.dominantSeventh;
      }
      // Special handling for seventh chords in IV position in major mode
      if (mode === 'major' && position === 3) { // IV is at position 3
        if (selectedChordTypes.borrowedChordType === 'major') {
          return type === 'maj7' && selectedChordTypes.seventhChords;
        } else if (selectedChordTypes.borrowedChordType === 'minor') {
          return type === 'mM7' && selectedChordTypes.seventhChords;
        } else { // 'both'
          return (type === 'maj7' && selectedChordTypes.seventhChords) || 
                 (type === 'mM7' && selectedChordTypes.seventhChords);
        }
      }
      // Minor-major seventh chords
      if (type === 'mM7') {
        return selectedChordTypes.seventhChords;
      }
      // Other seventh chords
      if (type === 'm7' || type === 'maj7') {
        return selectedChordTypes.seventhChords;
      }
      return true;
    });
  };

  // If startOnTonic is true, force the first chord to be the tonic
  if (startOnTonic) {
    const tonicChordOptions = filterChordTypes(chordTypes[0], 0);
    if (tonicChordOptions.length === 0) {
      // If no chord types are allowed for tonic, use the first available type
      tonicChordOptions.push(chordTypes[0][0]);
    }
    const tonicChord = `${scaleNotes[0]}${tonicChordOptions[Math.floor(Math.random() * tonicChordOptions.length)]}`;
    const remainingLength = length - 1;
    const remainingChords = [];
    
    // Generate remaining chords
    for (let i = 0; i < remainingLength; i++) {
      const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const note = getRootNote(randomPosition);
      const chordOptions = filterChordTypes(chordTypes[randomPosition], randomPosition);
      if (chordOptions.length === 0) {
        // If no chord types are allowed for this position, try a different position
        i--;
        continue;
      }
      const type = chordOptions[Math.floor(Math.random() * chordOptions.length)];
      remainingChords.push(note + type);
    }
    
    return [tonicChord, ...remainingChords];
  }

  // Generate random progression
  const progression = [];
  for (let i = 0; i < length; i++) {
    const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const note = getRootNote(randomPosition);
    const chordOptions = filterChordTypes(chordTypes[randomPosition], randomPosition);
    if (chordOptions.length === 0) {
      // If no chord types are allowed for this position, try a different position
      i--;
      continue;
    }
    const type = chordOptions[Math.floor(Math.random() * chordOptions.length)];
    progression.push(note + type);
  }

  return progression;
}

