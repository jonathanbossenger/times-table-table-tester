import React, { useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';

export function Results() {
  const { gameStatus, getScore, resetGame, streak } = useGame();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameStatus === 'completed' && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [gameStatus]);

  if (gameStatus !== 'completed') {
    return null;
  }

  const score = getScore();
  if (!score) {
    return null;
  }

  const timeInMinutes = Math.floor(score.timeSpent / 1000 / 60);
  const timeInSeconds = Math.floor((score.timeSpent / 1000) % 60);
  const cumulativeMinutes = Math.floor(score.cumulativeTime / 1000 / 60);
  const cumulativeSeconds = Math.floor((score.cumulativeTime / 1000) % 60);

  // Handle game reset
  const handleReset = () => {
    // Always reset streak if user has achieved 5 stars
    if (streak === 5) {
      resetGame(true); // Force streak reset
      return;
    }
    
    // Otherwise, only reset streak if the score wasn't perfect
    const isPerfect = score.correct === score.total && score.incorrectAttempts === 0;
    resetGame(!isPerfect);
  };

  // Check if this is a perfect game that will start or continue a streak
  const isPerfectGame = score.correct === score.total && score.incorrectAttempts === 0;

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

          {/* Only show total streak time if there's an active streak and this game will continue it */}
          {streak > 0 && isPerfectGame && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-center text-purple-600">
                {cumulativeMinutes}:{cumulativeSeconds.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-500 text-center">Total Streak Time</div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-2xl">
              {index < streak ? '⭐' : '☆'}
            </span>
          ))}
        </div>

        {streak > 0 && (
          <div className="text-center mt-2 text-yellow-600">
            {streak === 5 && "Perfect Streak! You're a Times Tables Master! 🏆"}
            {streak === 4 && "Amazing! Just one more perfect game for the ultimate achievement! 🌟"}
            {streak === 3 && "Fantastic! You're on fire! Keep going for that perfect streak! 🔥"}
            {streak === 2 && "Great work! You're building momentum! Three more to go! ✨"}
            {streak === 1 && "Excellent start! Keep practicing for a perfect streak! 💫"}
          </div>
        )}

        <button
          ref={buttonRef}
          onClick={handleReset}
          type="button"
          className="mt-8 w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {streak === 5 ? 'Start New Challenge' : 'Play Again'}
        </button>
      </div>
    </div>
  );
} 
