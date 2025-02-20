import React, { useRef, useEffect } from 'react';
import { useValidation } from '../../hooks/useValidation';

export function Problem({ id, multiplicand, multiplier, onFocus, registerRef, autoFocus, isLastProblem }) {
  const inputRef = useRef(null);
  const { handleAnswer, getAnswerStatus } = useValidation();
  
  useEffect(() => {
    registerRef(id, inputRef.current);
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [id, registerRef, autoFocus]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      onFocus('next', id, isLastProblem);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onFocus('next', id, isLastProblem);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onFocus('previous', id, isLastProblem);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      handleAnswer(id, value);
    }
  };

  const answerStatus = getAnswerStatus(id);
  
  return (
    <div 
      className={`p-4 border rounded-lg transition-colors duration-200 ${
        answerStatus === 'correct' ? 'bg-green-50 border-green-500' :
        answerStatus === 'incorrect' ? 'bg-red-50 border-red-500' :
        'bg-white border-gray-300 hover:border-blue-500'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-lg font-semibold whitespace-nowrap">
          {multiplicand} × {multiplier} = 
        </div>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`flex-1 p-2 border rounded focus:outline-none focus:ring-2 text-lg ${
            answerStatus === 'correct' ? 'border-green-500 focus:ring-green-200' :
            answerStatus === 'incorrect' ? 'border-red-500 focus:ring-red-200' :
            'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
          }`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label={`${multiplicand} times ${multiplier}`}
        />
      </div>
    </div>
  );
} 
