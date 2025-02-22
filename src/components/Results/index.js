import React from 'react';
import { useGame } from '../../context/GameContext';

export function Results() {
  const { gameStatus, getScore, resetGame } = useGame();

  if (gameStatus !== 'completed') {
    return null;
  }

  const score = getScore();
  if (!score) {
    return null;
  }

  const timeInMinutes = Math.floor(score.timeSpent / 1000 / 60);
  const timeInSeconds = Math.floor((score.timeSpent / 1000) % 60);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Game Complete!</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-4xl font-bold text-center text-blue-600">
              {score.percentage}%
            </div>
            <div className="text-gray-500 text-center">Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-center text-green-600">
                {score.correct}
              </div>
              <div className="text-gray-500 text-center">Correct</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-center text-red-600">
                {score.total - score.correct}
              </div>
              <div className="text-gray-500 text-center">Incorrect</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-center text-gray-600">
                {timeInMinutes}:{timeInSeconds.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-500 text-center">Time Taken</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-center text-orange-600">
                {score.incorrectAttempts}
              </div>
              <div className="text-gray-500 text-center">Total Incorrect Attempts</div>
            </div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="mt-8 w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
} 
