import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [problems, setProblems] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, completed
  const [answers, setAnswers] = useState({});
  const [incorrectAttempts, setIncorrectAttempts] = useState({}); // Track incorrect attempts per problem
  const [lowerBound, setLowerBound] = useState(1);
  const [upperBound, setUpperBound] = useState(12);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [streak, setStreak] = useState(0); // Always start at 0 when component mounts

  // Update localStorage when streak changes
  useEffect(() => {
    if (streak > 0) {
      localStorage.setItem('mathStreak', streak.toString());
    } else {
      localStorage.removeItem('mathStreak');
    }
  }, [streak]);

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
    setIncorrectAttempts({}); // Reset incorrect attempts
    return shuffled;
  }, [lowerBound, upperBound]);

  const startGame = useCallback(() => {
    generateProblems();
    setGameStatus('playing');
    setStartTime(Date.now());
    setEndTime(null);
  }, [generateProblems]);

  const submitAnswer = useCallback((problemId, userAnswer) => {
    // Only store the answer if it's not empty
    if (userAnswer === '') {
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[problemId];
        return newAnswers;
      });
      return;
    }

    const numericAnswer = parseInt(userAnswer, 10);
    const problem = problems.find(p => p.id === problemId);
    
    setAnswers(prev => ({
      ...prev,
      [problemId]: numericAnswer
    }));
  }, [problems]);

  // New function to track incorrect attempts when leaving a problem
  const trackIncorrectAttempt = useCallback((problemId) => {
    const problem = problems.find(p => p.id === problemId);
    const userAnswer = answers[problemId];
    
    if (problem && typeof userAnswer === 'number' && userAnswer !== problem.answer) {
      setIncorrectAttempts(prev => ({
        ...prev,
        [problemId]: (prev[problemId] || 0) + 1
      }));
    }
  }, [problems, answers]);

  const checkCompletion = useCallback(() => {
    if (Object.keys(answers).length === problems.length) {
      // Track final incorrect attempt for the last problem if needed
      const lastProblem = problems[problems.length - 1];
      if (lastProblem) {
        trackIncorrectAttempt(lastProblem.id);
      }
      
      // Calculate score to determine if perfect
      let correct = 0;
      let hasIncorrectAttempts = false;

      problems.forEach(problem => {
        const userAnswer = answers[problem.id];
        // Check if current answer is correct
        if (typeof userAnswer === 'number' && userAnswer === problem.answer) {
          correct++;
        }
        // Check if there were any incorrect attempts
        if (incorrectAttempts[problem.id] && incorrectAttempts[problem.id] > 0) {
          hasIncorrectAttempts = true;
        }
      });

      // Update streak only when game is completed with perfect score AND no incorrect attempts
      const isPerfect = correct === problems.length && !hasIncorrectAttempts;
      
      if (isPerfect) {
        const newStreak = streak + 1;
        setStreak(newStreak > 5 ? 5 : newStreak);
      } else {
        setStreak(0);
      }

      setGameStatus('completed');
      setEndTime(Date.now());
      return true;
    }
    return false;
  }, [answers, problems, trackIncorrectAttempt, incorrectAttempts, streak]);

  const getScore = useCallback(() => {
    if (gameStatus !== 'completed') return null;

    let correct = 0;
    let totalIncorrectAttempts = 0;
    
    problems.forEach(problem => {
      const userAnswer = answers[problem.id];
      const attempts = incorrectAttempts[problem.id] || 0;
      totalIncorrectAttempts += attempts;

      if (typeof userAnswer === 'number' && !isNaN(userAnswer)) {
        if (userAnswer === problem.answer) {
          correct++;
        }
      }
    });

    const totalIncorrectAnswers = problems.length - correct;
    const totalIncorrect = Math.max(totalIncorrectAnswers, totalIncorrectAttempts);
    
    // Calculate percentage based on correct answers out of total possible points
    const totalPossiblePoints = correct + totalIncorrect;
    const percentage = Math.round((correct / totalPossiblePoints) * 100);
    
    return {
      total: problems.length,
      correct,
      incorrectAttempts: totalIncorrectAttempts,
      incorrectAnswers: totalIncorrectAnswers,
      totalIncorrect,
      percentage,
      timeSpent: endTime - startTime
    };
  }, [problems, answers, incorrectAttempts, gameStatus, startTime, endTime]);

  const resetGame = useCallback((resetStreak = true) => {
    setProblems([]);
    setAnswers({});
    setIncorrectAttempts({});
    setGameStatus('idle');
    if (resetStreak) {
      setStreak(0);
    }
  }, []);

  const updateStreak = useCallback((newStreak) => {
    setStreak(newStreak);
  }, []);

  const value = {
    problems,
    gameStatus,
    answers,
    incorrectAttempts,
    lowerBound,
    upperBound,
    setLowerBound,
    setUpperBound,
    generateProblems,
    startGame,
    submitAnswer,
    trackIncorrectAttempt,
    checkCompletion,
    resetGame,
    getScore,
    streak,
    updateStreak,
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
