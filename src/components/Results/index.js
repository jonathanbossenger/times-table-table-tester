import React from 'react';
import { useGame } from '../../context/GameContext';

export function Results() {
  const { gameStatus, getScore, resetGame, streak, updateStreak } = useGame();

  if (gameStatus !== 'completed') {
    return null;
  }

  const score = getScore();
  if (!score) {
    return null;
  }

  const timeInMinutes = Math.floor(score.timeSpent / 1000 / 60);
  const timeInSeconds = Math.floor((score.timeSpent / 1000) % 60);

  // Check if current score is perfect
  const isPerfectScore = score.correct === score.total;

  // Handle game reset and streak update
  const handleReset = () => {
    const isPerfect = score.correct === score.total && score.incorrectAttempts === 0;
    resetGame(!isPerfect); // Only reset streak if the score wasn't perfect
  };

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

        {/* Add star streak display */}
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-2xl">
              {index < streak ? '⭐' : '☆'}
            </span>
          ))}
        </div>
        {streak === 5 && (
          <div className="text-center mt-2 text-yellow-600 font-bold">
            Perfect Streak! You're a Times Tables Master! 🏆
          </div>
        )}
        {streak === 4 && (
          <div className="text-center mt-2 text-yellow-600">
            Amazing! Just one more perfect game for the ultimate achievement! 🌟
          </div>
        )}
        {streak === 3 && (
          <div className="text-center mt-2 text-yellow-600">
            Fantastic! You're on fire! Keep going for that perfect streak! 🔥
          </div>
        )}
        {streak === 2 && (
          <div className="text-center mt-2 text-yellow-600">
            Great work! You're building momentum! Three more to go! ✨
          </div>
        )}
        {streak === 1 && (
          <div className="text-center mt-2 text-yellow-600">
            Excellent start! Keep practicing for a perfect streak! 💫
          </div>
        )}

        <button
          onClick={handleReset}
          className="mt-8 w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
} 
