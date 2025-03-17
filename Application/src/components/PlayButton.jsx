import * as Tone from 'tone';
import { generateChordProgression } from '../utils/generateChordProgression';

function PlayButton() {
  const playChord = async () => {
    await Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const progression = generateChordProgression('C', 4);
    console.log('Generated Progression:', progression);

    for (let chord of progression) {
      if (chord.length) {
        console.log('Playing:', chord);
        synth.triggerAttackRelease(chord, '1n');
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    synth.releaseAll(); // Stop any lingering sounds
  };

  return (
    <button onClick={playChord}>
      Generate & Play Progression
    </button>
  );
}

export default PlayButton;
