import { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [problems, setProblems] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, completed
  const [answers, setAnswers] = useState({});
  const [lowerBound, setLowerBound] = useState(1);
  const [upperBound, setUpperBound] = useState(12);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const generateProblems = useCallback(() => {
    const newProblems = [];
    // Generate problems only from selected times tables
    for (let i = lowerBound; i <= upperBound; i++) {
      for (let j = 1; j <= 12; j++) {
        newProblems.push({
          id: `${i}-${j}`,
          multiplicand: i,
          multiplier: j,
          answer: i * j
        });
      }
    }
    // Shuffle and take exactly 21 problems
    const shuffled = [...newProblems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 21); // Always take 21 problems

    setProblems(shuffled);
    setAnswers({});
    return shuffled;
  }, [lowerBound, upperBound]);

  const startGame = useCallback(() => {
    generateProblems();
    setGameStatus('playing');
    setStartTime(Date.now());
    setEndTime(null);
  }, [generateProblems]);

  const submitAnswer = useCallback((problemId, userAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [problemId]: parseInt(userAnswer, 10)
    }));
  }, []);

  const checkCompletion = useCallback(() => {
    if (Object.keys(answers).length === problems.length) {
      setGameStatus('completed');
      setEndTime(Date.now());
      return true;
    }
    return false;
  }, [answers, problems]);

  const getScore = useCallback(() => {
    if (gameStatus !== 'completed') return null;
    
    const correctAnswers = problems.filter(
      problem => answers[problem.id] === problem.answer
    ).length;
    
    return {
      total: problems.length,
      correct: correctAnswers,
      percentage: Math.round((correctAnswers / problems.length) * 100),
      timeSpent: endTime - startTime
    };
  }, [problems, answers, gameStatus, startTime, endTime]);

  const resetGame = useCallback(() => {
    setProblems([]);
    setAnswers({});
    setGameStatus('idle');
  }, []);

  const value = {
    problems,
    gameStatus,
    answers,
    lowerBound,
    upperBound,
    setLowerBound,
    setUpperBound,
    generateProblems,
    startGame,
    submitAnswer,
    checkCompletion,
    resetGame,
    getScore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
