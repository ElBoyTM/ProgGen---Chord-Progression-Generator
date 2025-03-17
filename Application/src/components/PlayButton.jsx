import * as Tone from 'tone';

function PlayButton() {
  const playChord = async () => {
    await Tone.start(); // Start audio context (required by Tone.js)

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // Play a C major triad (C, E, G)
    synth.triggerAttackRelease(['C4', 'E4', 'G4'], '1n');
  };

  return (
    <button onClick={playChord}>
      Play Chord
    </button>
  );
}

export default PlayButton;
