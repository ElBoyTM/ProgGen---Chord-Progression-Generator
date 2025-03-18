import { Scale, Chord } from 'tonal';

const CHORD_TYPES = ['', 'm', 'dim', 'aug'];
const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function generateChordProgression(key = 'C', progressionLength = 4) {
  const progression = [];
  
  // If no key is selected, use all notes
  const availableNotes = key ? Scale.get(`${key} major`).notes : ALL_NOTES;

  for (let i = 0; i < progressionLength; i++) {
    const note = availableNotes[Math.floor(Math.random() * availableNotes.length)];
    const type = CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];
    
    // Get the chord object to ensure valid chord
    const chordObj = Chord.get(note + type);
    
    if (chordObj.notes.length) {
      // Return the chord symbol in a format Tone.js can understand
      progression.push(note + type);
    }
  }

  return progression;
}
