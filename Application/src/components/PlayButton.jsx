import * as Tone from 'tone';
import { generateChordProgression } from '../utils/generateChordProgression';
import { useState } from 'react';
import ChordDisplay from './ChordDisplay';
import { Chord } from 'tonal';

function PlayButton() {
  const [currentProgression, setCurrentProgression] = useState([]);

  const playChord = async () => {
    try {
      // Start audio context
      await Tone.start();
      
      // Create a polyphonic synth
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -10;

      const progression = generateChordProgression('C', 4);
      setCurrentProgression(progression);
      console.log('Generated Progression:', progression);

      // Play chords one at a time (1 second apart)
      for (let chordSymbol of progression) {
        if (chordSymbol.length) {
          console.log('Playing:', chordSymbol);
          // Get the actual notes for this chord
          const chordObj = Chord.get(chordSymbol);
          const notes = chordObj.notes.map(note => note + '4'); // Add octave
          console.log('Notes:', notes);
          synth.triggerAttackRelease(notes, '1n');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      synth.releaseAll(); // Stop any lingering sounds
    } catch (error) {
      console.error('Error playing chord progression:', error);
    }
  };

  return (
    <div>
      <button onClick={playChord}>
        Generate & Play Progression
      </button>
      <ChordDisplay progression={currentProgression} />
    </div>
  );
}

export default PlayButton;
