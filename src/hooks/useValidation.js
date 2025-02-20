import { useCallback } from 'react';
import { useGame } from '../context/GameContext';

export function useValidation() {
  const { problems, answers, submitAnswer } = useGame();

  const validateAnswer = useCallback((problemId, answer) => {
    const problem = problems.find(p => p.id === problemId);
    if (!problem) return false;

    const numericAnswer = parseInt(answer, 10);
    return !isNaN(numericAnswer) && numericAnswer === problem.answer;
  }, [problems]);

  const handleAnswer = useCallback((problemId, answer) => {
    // Only accept numeric input
    if (answer === '' || /^\d+$/.test(answer)) {
      submitAnswer(problemId, answer);
      return true;
    }
    return false;
  }, [submitAnswer]);

  const getAnswerStatus = useCallback((problemId) => {
    const answer = answers[problemId];
    if (answer === undefined || answer === '') return 'unanswered';
    
    return validateAnswer(problemId, answer) ? 'correct' : 'incorrect';
  }, [answers, validateAnswer]);

  return {
    validateAnswer,
    handleAnswer,
    getAnswerStatus
  };
}
