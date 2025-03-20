import { Scale } from 'tonal';

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define chord types for each scale degree in different modes
const MODE_CHORD_TYPES = {
  major: [['', 'M7'], ['m', 'm7'], ['m', 'm7'], ['', 'M7'], ['', '7'], ['m', 'm7'], ['dim', 'm7b5']],
  minor: [['m', 'm7'], ['dim', 'm7b5'], ['', 'M7'], ['m', 'm7'], ['m', 'm7'], ['', 'M7'], ['', '7']],
  dorian: [['m', 'm7'], ['m', 'm7'], ['', 'M7'], ['', '7'], ['m', 'm7'], ['dim', 'm7b5'], ['', 'M7']],
  phrygian: [['m', 'm7'], ['', 'M7'], ['', '7'], ['m', 'm7'], ['dim', 'm7b5'], ['', 'M7'], ['m', 'm7']],
  lydian: [['', 'M7'], ['', '7'], ['m', 'm7'], ['dim', 'm7b5'], ['', 'M7'], ['m', 'm7'], ['m', 'm7']],
  mixolydian: [['', '7'], ['m', 'm7'], ['dim', 'm7b5'], ['', 'M7'], ['m', 'm7'], ['m', 'm7'], ['', 'M7']],
  locrian: [['dim', 'm7b5'], ['', 'M7'], ['m', 'm7'], ['m', 'm7'], ['', 'M7'], ['', '7'], ['m', 'm7']],
  chromatic: Array(12).fill(['', 'm', 'dim', 'aug', 'M7', 'm7', '7', 'dim7', 'm7b5', 'aug7', 'maj7#5', 'mM7'])
};

export function generateChordProgression(key, mode, length, startOnTonic = true) {
  // If no key is provided or mode is chromatic, generate random chromatic progression
  if (!key || mode === 'chromatic') {
    const progression = [];
    const chordTypes = ['', 'm', 'dim', 'aug', 'M7', 'm7', '7', 'dim7', 'm7b5', 'aug7', 'maj7#5', 'mM7'];
    
    for (let i = 0; i < length; i++) {
      const randomNote = ALL_NOTES[Math.floor(Math.random() * ALL_NOTES.length)];
      const randomType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
      progression.push(randomNote + randomType);
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

  // If startOnTonic is true, force the first chord to be the tonic
  if (startOnTonic) {
    const tonicChordOptions = chordTypes[0];
    const tonicChord = `${scaleNotes[0]}${tonicChordOptions[Math.floor(Math.random() * tonicChordOptions.length)]}`;
    const remainingLength = length - 1;
    const remainingChords = [];
    
    // Generate remaining chords
    for (let i = 0; i < remainingLength; i++) {
      const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const note = scaleNotes[randomPosition];
      const chordOptions = chordTypes[randomPosition];
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
    const chordOptions = chordTypes[randomPosition];
    const type = chordOptions[Math.floor(Math.random() * chordOptions.length)];
    progression.push(note + type);
  }
  return progression;
}
