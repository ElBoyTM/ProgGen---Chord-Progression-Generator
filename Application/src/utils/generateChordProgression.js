import { Scale, Chord } from 'tonal';

const CHORD_TYPES = ['', 'm', 'dim', 'aug'];

export function generateChordProgression(key = 'C', progressionLength = 4) {
  const scaleNotes = Scale.get(`${key} major`).notes;
  const progression = [];

  for (let i = 0; i < progressionLength; i++) {
    const note = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
    const type = CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];

    // Chord.get() returns a structured object with note array
    const fullChord = Chord.get(note + type);

    if (fullChord.notes.length) {
      progression.push(fullChord.notes.map(n => `${n}4`)); // Add octave for clarity
    }
  }

  return progression;
}
