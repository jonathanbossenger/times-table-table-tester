import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';

export function useTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { gameStatus } = useGame();

  const start = useCallback(() => {
    setIsRunning(true);
    setTime(0);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let intervalId;

    if (isRunning && gameStatus === 'playing') {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, gameStatus]);

  // Format time as MM:SS
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);

  return {
    time,
    formattedTime,
    isRunning,
    start,
    stop,
    reset
  };
}
