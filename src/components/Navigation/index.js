import React from 'react';
import { useGame } from '../../context/GameContext';

export function Navigation() {
  const { 
    lowerBound, 
    upperBound, 
    setLowerBound, 
    setUpperBound, 
    gameStatus,
    startGame
  } = useGame();

  // Only show navigation when game is idle
  if (gameStatus !== 'idle') {
    return null;
  }

  const handleLowerBoundChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= upperBound) {
      setLowerBound(value);
    }
  };

  const handleUpperBoundChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= lowerBound) {
      setUpperBound(value);
    }
  };

  const handleStartGame = () => {
    if (lowerBound > upperBound) {
      alert('Lower bound must be less than or equal to upper bound');
      return;
    }
    startGame();
  };

  return (
    <nav className="bg-white shadow-lg p-8 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to start!</h2>
            <p className="text-gray-600">Select your times tables range and press start to begin.</p>
            <p className="text-gray-600">Complete 5 sets to complete a streak for the selected range.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Times Tables Range:</h3>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="lowerBound" className="text-gray-600">From:</label>
                <select
                  id="lowerBound"
                  value={lowerBound}
                  onChange={handleLowerBoundChange}
                  className="p-2 border rounded-lg"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="upperBound" className="text-gray-600">To:</label>
                <select
                  id="upperBound"
                  value={upperBound}
                  onChange={handleUpperBoundChange}
                  className="p-2 border rounded-lg"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStartGame}
                className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 
