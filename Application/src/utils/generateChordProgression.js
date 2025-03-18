import { Scale, Chord } from 'tonal';

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const CHORD_TYPES = ['', 'm', 'dim', 'aug'];

// Define chord types for each scale degree in different modes
const MODE_CHORD_TYPES = {
  major: ['', 'm', 'm', '', '', 'm', 'dim'], // Ionian
  dorian: ['m', 'm', '', '', 'm', 'dim', ''],
  phrygian: ['m', '', '', 'm', 'dim', '', 'm'],
  lydian: ['', '', '', 'dim', '', 'm', 'm'],
  mixolydian: ['', 'm', 'm', '', 'm', 'dim', ''],
  minor: ['m', 'dim', '', 'm', 'm', '', ''], // Aeolian
  locrian: ['dim', '', 'm', 'm', '', '', 'm']
};

export function generateChordProgression(key = 'C', mode = 'major', progressionLength = 4) {
  const progression = [];
  
  if (mode === 'chromatic') {
    // Generate random chromatic progression
    for (let i = 0; i < progressionLength; i++) {
      const note = ALL_NOTES[Math.floor(Math.random() * ALL_NOTES.length)];
      const type = CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];
      progression.push(note + type);
    }
  } else {
    // Get the scale notes for the selected mode
    const scale = Scale.get(`${key} ${mode}`);
    if (!scale.notes.length) return progression;

    // Generate progression using the mode's chord types
    const chordTypes = MODE_CHORD_TYPES[mode] || MODE_CHORD_TYPES.major;
    
    for (let i = 0; i < progressionLength; i++) {
      const scalePosition = i % scale.notes.length;
      const note = scale.notes[scalePosition];
      const chordType = chordTypes[scalePosition];
      progression.push(note + chordType);
    }
  }

  return progression;
}
