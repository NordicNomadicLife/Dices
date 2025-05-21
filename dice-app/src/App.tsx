import { useState } from 'react';

function App() {
  const [numDice, setNumDice] = useState<number>(2);
  const [sides, setSides] = useState<number>(6);
  const [results, setResults] = useState<number[]>([]);

  const rollDice = () => {
    const newResults = Array.from({ length: numDice }, () =>
      Math.floor(Math.random() * sides) + 1
    );
    setResults(newResults);
  };

 const getDiceImage = (value: number) => {
  return new URL(`./assets/dice${value}.svg`, import.meta.url).href;
};


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Flexibel Tärningskastare 🎲</h1>

      <div>
        <label htmlFor="numDice">Antal tärningar: </label>
        <select
          id="numDice"
          value={numDice}
          onChange={(e) => setNumDice(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="sides">Antal sidor per tärning: </label>
        <select
          id="sides"
          value={sides}
          onChange={(e) => setSides(Number(e.target.value))}
        >
          {[4, 6, 8, 10, 12, 20].map((side) => (
            <option key={side} value={side}>
              {side}
            </option>
          ))}
        </select>
      </div>

      <button onClick={rollDice} style={{ marginTop: '20px' }}>
        Kasta
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Resultat:</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              marginTop: '10px',
            }}
          >
            {results.map((val, idx) => (
              <div key={idx}>
                {sides === 6 ? (
                  <img
                    src={getDiceImage(val)}
                    alt={`Tärning ${val}`}
                    width={80}
                    height={80}
                  />
                ) : (
                  <div style={{ fontSize: '2rem' }}>🎲 {val}</div>
                )}
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: '20px' }}>
            Summa: {results.reduce((a, b) => a + b, 0)}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
