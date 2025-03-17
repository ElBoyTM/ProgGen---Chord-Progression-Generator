import { useState } from 'react';

function ChordDisplay({ chords }) {
  const [activeChord, setActiveChord] = useState(null);

  return (
    <div style={styles.container}>
      {chords.map((chord, index) => (
        <div
          key={index}
          style={{
            ...styles.chord,
            backgroundColor: activeChord === index ? '#4caf50' : '#ddd',
          }}
        >
          {chord.join(' ')}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '10px',
    padding: '10px',
  },
  chord: {
    padding: '10px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
};

export default ChordDisplay;
