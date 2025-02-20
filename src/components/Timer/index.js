import React, { useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useGame } from '../../context/GameContext';

export function Timer() {
  const { time, formattedTime, isRunning, start, stop } = useTimer();
  const { gameStatus } = useGame();

  useEffect(() => {
    if (gameStatus === 'playing' && !isRunning) {
      start();
    } else if (gameStatus !== 'playing' && isRunning) {
      stop();
    }
  }, [gameStatus, isRunning, start, stop]);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <div className="text-2xl font-mono font-bold">
        {formattedTime()}
      </div>
      <div className="text-sm text-gray-500">
        Time Elapsed
      </div>
    </div>
  );
} 
