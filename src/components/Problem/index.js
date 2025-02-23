import React, { useRef, useEffect, useState } from 'react';
import { useValidation } from '../../hooks/useValidation';
import { useGame } from '../../context/GameContext';

export function Problem({ id, multiplicand, multiplier, onFocus, registerRef, autoFocus, isLastProblem }) {
  const inputRef = useRef(null);
  const { handleAnswer, getAnswerStatus } = useValidation();
  const { gameStatus, trackIncorrectAttempt } = useGame();
  const [hasLeft, setHasLeft] = useState(false);
  
  useEffect(() => {
    registerRef(id, inputRef.current);
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [id, registerRef, autoFocus]);

  const handleKeyDown = (e) => {
    // Prevent keyboard navigation when game is completed
    if (gameStatus === 'completed') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      trackIncorrectAttempt(id);
      setHasLeft(true);
      onFocus('next', id, isLastProblem);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      trackIncorrectAttempt(id);
      setHasLeft(true);
      onFocus('next', id, isLastProblem);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      trackIncorrectAttempt(id);
      setHasLeft(true);
      onFocus('previous', id, isLastProblem);
    }
  };

  const handleChange = (e) => {
    // Prevent input changes when game is completed
    if (gameStatus === 'completed') {
      e.preventDefault();
      return;
    }

    const value = e.target.value;
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      handleAnswer(id, value);
      // Reset hasLeft when the user starts typing again
      setHasLeft(false);
    }
  };

  const answerStatus = getAnswerStatus(id);
  const correctAnswer = multiplicand * multiplier;
  
  return (
    <div 
      className={`p-4 border rounded-lg transition-colors duration-200 ${
        answerStatus === 'correct' ? 'bg-green-50 border-green-500' :
        (answerStatus === 'incorrect' && hasLeft) ? 'bg-red-50 border-red-500' :
        'bg-white border-gray-300 hover:border-blue-500'
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="text-lg font-semibold whitespace-nowrap mr-auto problem-text">
            {multiplicand} × {multiplier} = 
          </div>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            disabled={gameStatus === 'completed'}
            className={`w-48 p-2 border rounded focus:outline-none focus:ring-2 text-lg ${
              answerStatus === 'correct' ? 'border-green-500 focus:ring-green-200' :
              (answerStatus === 'incorrect' && hasLeft) ? 'border-red-500 focus:ring-red-200' :
              'border-gray-300 focus:ring-blue-200 focus:border-blue-500 problem-input'
            }`}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label={`${multiplicand} times ${multiplier}`}
          />
        </div>
        {answerStatus === 'incorrect' && hasLeft && (
          <div className="text-sm text-red-600 mt-2 text-right">
            Correct answer: <span className="font-bold">{correctAnswer}</span>
          </div>
        )}
      </div>
    </div>
  );
} 
