import * as Tone from 'tone';
import { generateChordProgression } from '../utils/generateChordProgression';
import { useState } from 'react';
import ChordDisplay from './ChordDisplay';
import KeySelector from './KeySelector';
import { Chord } from 'tonal';

function PlayButton() {
  const [currentProgression, setCurrentProgression] = useState([]);
  const [selectedKey, setSelectedKey] = useState('C');

  const playChord = async () => {
    try {
      // Start audio context
      await Tone.start();
      
      // Create a polyphonic synth
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -10;

      const progression = generateChordProgression(selectedKey, 4);
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
          
          // Release any currently playing notes
          synth.releaseAll();
          
          // Play the new chord
          synth.triggerAttackRelease(notes, '1n');
          
          // Wait for the chord to finish playing
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Final cleanup
      synth.releaseAll();
    } catch (error) {
      console.error('Error playing chord progression:', error);
    }
  };

  return (
    <div>
      <KeySelector 
        selectedKey={selectedKey} 
        onKeyChange={setSelectedKey} 
      />
      <button onClick={playChord}>
        Generate & Play Progression
      </button>
      <ChordDisplay progression={currentProgression} />
    </div>
  );
}

export default PlayButton;
