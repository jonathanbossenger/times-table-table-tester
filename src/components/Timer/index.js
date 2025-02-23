import React, { useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useGame } from '../../context/GameContext';

export function Timer() {
  const { time, formattedTime, isRunning, start, stop, reset } = useTimer();
  const { gameStatus, streak, cumulativeTime } = useGame();

  useEffect(() => {
    if (gameStatus === 'playing' && !isRunning) {
      start();
    } else if (gameStatus !== 'playing' && isRunning) {
      stop();
    }
    
    // Reset timer when game returns to idle state and no streak
    if (gameStatus === 'idle' && streak === 0) {
      reset();
    }
  }, [gameStatus, isRunning, start, stop, reset, streak]);

  const totalTimeInSeconds = Math.floor((cumulativeTime + (isRunning ? time * 1000 : 0)) / 1000);
  const totalMinutes = Math.floor(totalTimeInSeconds / 60);
  const totalSeconds = totalTimeInSeconds % 60;

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <div className="text-2xl font-mono font-bold">
        {formattedTime()}
      </div>
      <div className="text-sm text-gray-500">
        Time Elapsed
      </div>
      {streak > 0 && (
        <>
          <div className="text-xl font-mono font-bold mt-2 text-purple-600">
            {totalMinutes}:{totalSeconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-purple-500">
            Total Streak Time
          </div>
        </>
      )}
    </div>
  );
} 
