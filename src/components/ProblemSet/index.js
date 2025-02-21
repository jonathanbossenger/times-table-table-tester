import React, { useEffect } from 'react';
import { Problem } from '../Problem';
import { useGame } from '../../context/GameContext';
import { useFocus } from '../../hooks/useFocus';
import toast from 'react-hot-toast';

export function ProblemSet() {
  const { problems, gameStatus, checkCompletion, getScore, answers } = useGame();
  const { registerRef, focusNext, focusPrevious } = useFocus();

  const handleFocus = (direction, currentId, isLastProblem) => {
    if (isLastProblem && direction === 'next') {
      // Check if all problems have answers
      const answeredCount = Object.keys(answers).length;
      if (answeredCount === problems.length) {
        checkCompletion();
        return; // Don't move focus if game is complete
      }
    }

    if (direction === 'next') {
      focusNext(currentId);
    } else {
      focusPrevious(currentId);
    }
  };

  useEffect(() => {
    if (gameStatus === 'playing') {
      const checkAndNotifyCompletion = () => {
        if (checkCompletion()) {
          const score = getScore();
          if (score) {
            toast.success(
              `Completed! Score: ${score.correct}/${score.total} (${score.percentage}%)`,
              { duration: 5000 }
            );
          }
        }
      };

      document.addEventListener('change', checkAndNotifyCompletion);
      return () => {
        document.removeEventListener('change', checkAndNotifyCompletion);
      };
    }
  }, [gameStatus, checkCompletion, getScore]);

  if (gameStatus === 'idle') {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-700">Ready</h2>
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold">Loading problems...</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 max-w-6xl mx-auto">
      {problems.map((problem, index) => (
        <Problem
          key={problem.id}
          id={problem.id}
          multiplicand={problem.multiplicand}
          multiplier={problem.multiplier}
          onFocus={handleFocus}
          registerRef={registerRef}
          autoFocus={index === 0}
          isLastProblem={index === problems.length - 1}
        />
      ))}
    </div>
  );
} 
