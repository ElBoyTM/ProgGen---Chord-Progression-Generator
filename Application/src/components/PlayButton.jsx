import * as Tone from 'tone';
import { generateChordProgression } from '../utils/generateChordProgression';

function PlayButton() {
  const playChord = async () => {
    await Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const progression = generateChordProgression('C', 4);
    console.log('Generated Progression:', progression);

    // Play chords one at a time (500ms apart)
    for (let chord of progression) {
      synth.triggerAttackRelease(chord.split(' '), '1n');
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  return (
    <button onClick={playChord}>
      Generate & Play Progression
    </button>
  );
}

export default PlayButton;
