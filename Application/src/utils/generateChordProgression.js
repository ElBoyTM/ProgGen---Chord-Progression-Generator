import { Scale, Chord } from 'tonal';

const CHORD_TYPES = ['', 'm', 'dim', 'aug'];

export function generateChordProgression(key = 'C', progressionLength = 4) {
  const scaleNotes = Scale.get(`${key} major`).notes;
  const progression = [];

  for (let i = 0; i < progressionLength; i++) {
    const note = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
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
