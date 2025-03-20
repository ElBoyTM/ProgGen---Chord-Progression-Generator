import { Scale, Chord } from 'tonal';

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const MODE_CHORD_TYPES = {
  major: [
    ['major', 'maj7'], // I
    ['minor', 'm7'],   // ii
    ['minor', 'm7'],   // iii
    ['major', 'maj7'], // IV
    ['major', '7'],    // V
    ['minor', 'm7'],   // vi
    ['dim', 'm7b5']    // vii°
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
      allowedChords.push('dim', 'dim7');
    }
    if (selectedChordTypes.augmentedChords) {
      allowedChords.push('aug', 'aug7');
    }
    if (selectedChordTypes.seventhChords) {
      allowedChords.push('7', 'm7', 'maj7');
    }

    // If no chord types are selected, default to all types
    if (allowedChords.length === 0) {
      allowedChords.push('major', 'minor', 'dim', 'dim7', 'aug', 'aug7', '7', 'm7', 'maj7');
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
  const availablePositions = Array.from({ length: scaleNotes.length }, (_, i) => i);

  // Filter chord types based on user selection
  const filterChordTypes = (types) => {
    return types.filter(type => {
      if (type.includes('major') || type.includes('minor')) {
        return selectedChordTypes.simpleTriads;
      }
      if (type.includes('dim')) {
        return selectedChordTypes.diminishedChords;
      }
      if (type.includes('aug')) {
        return selectedChordTypes.augmentedChords;
      }
      if (type.includes('7') || type.includes('maj7')) {
        return selectedChordTypes.seventhChords;
      }
      return true;
    });
  };

  // If startOnTonic is true, force the first chord to be the tonic
  if (startOnTonic) {
    const tonicChordOptions = filterChordTypes(chordTypes[0]);
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
      const note = scaleNotes[randomPosition];
      const chordOptions = filterChordTypes(chordTypes[randomPosition]);
      if (chordOptions.length === 0) {
        // If no chord types are allowed for this position, use the first available type
        chordOptions.push(chordTypes[randomPosition][0]);
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
    const note = scaleNotes[randomPosition];
    const chordOptions = filterChordTypes(chordTypes[randomPosition]);
    if (chordOptions.length === 0) {
      // If no chord types are allowed for this position, use the first available type
      chordOptions.push(chordTypes[randomPosition][0]);
    }
    const type = chordOptions[Math.floor(Math.random() * chordOptions.length)];
    progression.push(note + type);
  }

  return progression;
}
