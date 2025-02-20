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

  if (gameStatus === 'playing') {
    return null; // Hide navigation during gameplay
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
    <nav className="bg-white shadow-lg p-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Select Times Tables Range:</h2>
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
    </nav>
  );
} 
