import * as Tone from 'tone';
import { generateChordProgression } from '../utils/generateChordProgression';
import { useState, useRef } from 'react';
import ChordDisplay from './ChordDisplay';
import KeySelector from './KeySelector';
import LengthSelector from './LengthSelector';
import ChordTypeSelector from './ChordTypeSelector';
import { Chord } from 'tonal';
import '../styles/ChordTypeSelector.css';

function PlayButton() {
  const [currentProgression, setCurrentProgression] = useState([]);
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedMode, setSelectedMode] = useState('major');
  const [selectedLength, setSelectedLength] = useState('4');
  const [startOnTonic, setStartOnTonic] = useState(true);
  const [isRepeating, setIsRepeating] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [tempoInput, setTempoInput] = useState('60');
  const synthRef = useRef(null);
  const intervalRef = useRef(null);

  const playChord = async () => {
    try {
      // Start audio context
      await Tone.start();
      
      // Create a polyphonic synth if it doesn't exist
      if (!synthRef.current) {
        synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
        synthRef.current.volume.value = -10;
      }

      // Determine the length of the progression
      const length = selectedLength === 'random' 
        ? Math.floor(Math.random() * 8) + 1 
        : parseInt(selectedLength);

      const progression = generateChordProgression(selectedKey, selectedMode, length, startOnTonic);
      setCurrentProgression(progression);
      console.log('Generated Progression:', progression);

      // Calculate delay based on tempo
      const delayMs = (60 / tempo) * 1000;

      // Play chords one at a time at the specified tempo
      for (let chordSymbol of progression) {
        if (chordSymbol.length) {
          console.log('Playing:', chordSymbol);
          const chordObj = Chord.get(chordSymbol);
          const notes = chordObj.notes.map(note => note + '4');
          console.log('Notes:', notes);
          
          synthRef.current.releaseAll();
          synthRef.current.triggerAttackRelease(notes, `${60/tempo}n`);
          
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }

      // If repeating is enabled, start the loop
      if (isRepeating) {
        startRepeatLoop(progression);
      }
    } catch (error) {
      console.error('Error playing chord progression:', error);
    }
  };

  const startRepeatLoop = (progression) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let currentIndex = 0;
    
    // Calculate delay based on tempo
    const delayMs = (60 / tempo) * 1000;
    
    // Start a new interval that plays the progression
    intervalRef.current = setInterval(() => {
      if (currentIndex >= progression.length) {
        currentIndex = 0;
      }

      const chordSymbol = progression[currentIndex];
      if (chordSymbol.length) {
        const chordObj = Chord.get(chordSymbol);
        const notes = chordObj.notes.map(note => note + '4');
        synthRef.current.releaseAll();
        synthRef.current.triggerAttackRelease(notes, `${60/tempo}n`);
      }
      currentIndex++;
    }, delayMs);
  };

  const toggleRepeat = () => {
    if (isRepeating) {
      // Stop repeating
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.releaseAll();
      }
      setIsRepeating(false);
    } else {
      // Start repeating with current progression
      setIsRepeating(true);
      if (currentProgression.length === 0) {
        // If no progression exists, generate and play a new one
        playChord();
      } else {
        // Use existing progression
        startRepeatLoop(currentProgression);
      }
    }
  };

  return (
    <div>
      <div className="controls">
        <KeySelector 
          selectedKey={selectedKey} 
          selectedMode={selectedMode}
          onKeyChange={setSelectedKey}
          onModeChange={setSelectedMode}
        />
        <LengthSelector
          selectedLength={selectedLength}
          onLengthChange={setSelectedLength}
        />
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="start-on-tonic"
            checked={startOnTonic}
            onChange={(e) => setStartOnTonic(e.target.checked)}
            disabled={selectedMode === 'chromatic'}
          />
          <label htmlFor="start-on-tonic">Always start on tonic</label>
        </div>
        <div className="tempo-control">
          <label htmlFor="tempo">Tempo (BPM):</label>
          <input
            type="number"
            id="tempo"
            min="30"
            max="200"
            value={tempoInput}
            onChange={(e) => {
              const inputValue = e.target.value;
              setTempoInput(inputValue);
              
              const newTempo = parseInt(inputValue);
              if (!isNaN(newTempo) && newTempo >= 30 && newTempo <= 200) {
                setTempo(newTempo);
                // If currently repeating, restart the loop with new tempo
                if (isRepeating && currentProgression.length > 0) {
                  startRepeatLoop(currentProgression);
                }
              }
            }}
            onBlur={() => {
              const newTempo = parseInt(tempoInput);
              if (isNaN(newTempo) || newTempo < 30 || newTempo > 200) {
                setTempoInput(tempo.toString());
              }
            }}
          />
        </div>
      </div>
      <div className="button-group">
        <button onClick={playChord} disabled={isRepeating}>
          Generate & Play Progression
        </button>
        {currentProgression.length > 0 && (
          <button 
            onClick={toggleRepeat}
            className={isRepeating ? 'active' : ''}
          >
            {isRepeating ? 'Stop Repeat' : 'Repeat Progression'}
          </button>
        )}
      </div>
      <ChordDisplay progression={currentProgression} />
      <ChordTypeSelector selectedMode={selectedMode} />
    </div>
  );
}

export default PlayButton;
