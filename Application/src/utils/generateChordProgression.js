import { chord, scale } from 'tonal';

const CHORD_TYPES = ['maj', 'min', 'dim', 'aug'];

export function generateChordProgression(key = 'C', progressionLength = 4) {
  const scaleNotes = scale.get(`${key} major`).notes;
  const progression = [];

  for (let i = 0; i < progressionLength; i++) {
    const note = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
    const type = CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];
    const fullChord = chord.getChord(type, note);

    progression.push(fullChord.symbol || `${note}${type}`);
  }

  return progression;
}
