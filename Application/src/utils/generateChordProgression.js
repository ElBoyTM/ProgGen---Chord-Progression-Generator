import { Scale, Chord } from 'tonal';

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define chord types for each scale degree in different modes
const MODE_CHORD_TYPES = {
  major: ['', 'm', 'm', '', '', 'm', 'dim'],
  minor: ['m', 'dim', '', 'm', 'm', '', ''],
  dorian: ['m', 'm', '', '', 'm', 'dim', ''],
  phrygian: ['m', '', '', 'm', 'dim', '', 'm'],
  lydian: ['', '', 'm', 'dim', '', 'm', 'm'],
  mixolydian: ['', 'm', 'dim', '', 'm', 'm', ''],
  locrian: ['dim', '', 'm', 'm', '', '', 'm']
};

export function generateChordProgression(key, mode, length, startOnTonic = true) {
  // If no key is provided, generate random chromatic progression
  if (!key) {
    const progression = [];
    for (let i = 0; i < length; i++) {
      const randomNote = ALL_NOTES[Math.floor(Math.random() * ALL_NOTES.length)];
      const randomType = Math.random() < 0.5 ? 'm' : '';
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
    const tonicChord = `${scaleNotes[0]}${chordTypes[0]}`;
    const remainingLength = length - 1;
    const remainingChords = [];
    
    // Generate remaining chords
    for (let i = 0; i < remainingLength; i++) {
      const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const note = scaleNotes[randomPosition];
      const type = chordTypes[randomPosition];
      remainingChords.push(note + type);
    }
    
    return [tonicChord, ...remainingChords];
  }

  // Generate random progression
  const progression = [];
  for (let i = 0; i < length; i++) {
    const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const note = scaleNotes[randomPosition];
    const type = chordTypes[randomPosition];
    progression.push(note + type);
  }
  return progression;
}
