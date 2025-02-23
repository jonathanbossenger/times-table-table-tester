import { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [problems, setProblems] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, completed
  const [answers, setAnswers] = useState({});
  const [incorrectAttempts, setIncorrectAttempts] = useState({});
  const [lowerBound, setLowerBound] = useState(2);
  const [upperBound, setUpperBound] = useState(12);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [streak, setStreak] = useState(0);
  const [lastRange, setLastRange] = useState(null);
  const [cumulativeTime, setCumulativeTime] = useState(0);

  // Check if range matches the last game's range
  const isRangeConsistent = useCallback(() => {
    if (!lastRange) return true;
    return lastRange.lower === lowerBound && lastRange.upper === upperBound;
  }, [lastRange, lowerBound, upperBound]);

  const generateProblems = useCallback(() => {
    // Break streak if range changed
    if (streak > 0 && !isRangeConsistent()) {
      setStreak(0);
      setCumulativeTime(0);
    }

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
      .slice(0, 21);

    setProblems(shuffled);
    setAnswers({});
    setIncorrectAttempts({});
    return shuffled;
  }, [lowerBound, upperBound, streak, isRangeConsistent]);

  const startGame = useCallback(() => {
    generateProblems();
    setGameStatus('playing');
    setStartTime(Date.now());
    setEndTime(null);
    // Store current range for streak tracking
    setLastRange({ lower: lowerBound, upper: upperBound });
  }, [generateProblems, lowerBound, upperBound]);

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
    
    setAnswers(prev => ({
      ...prev,
      [problemId]: numericAnswer
    }));
  }, []);

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
        if (typeof userAnswer === 'number' && userAnswer === problem.answer) {
          correct++;
        }
        if (incorrectAttempts[problem.id] && incorrectAttempts[problem.id] > 0) {
          hasIncorrectAttempts = true;
        }
      });

      const isPerfect = correct === problems.length && !hasIncorrectAttempts;
      const currentGameTime = endTime ? endTime - startTime : Date.now() - startTime;
      
      if (isPerfect && isRangeConsistent()) {
        const newStreak = streak + 1;
        setStreak(newStreak > 5 ? 5 : newStreak);
        setCumulativeTime(cumulativeTime + currentGameTime);
      } else {
        setStreak(0);
        setCumulativeTime(0);
      }

      setGameStatus('completed');
      setEndTime(Date.now());
      return true;
    }
    return false;
  }, [answers, problems, trackIncorrectAttempt, incorrectAttempts, streak, isRangeConsistent, startTime, endTime, cumulativeTime]);

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
    const percentage = Math.round((correct / (correct + totalIncorrect)) * 100);
    const currentGameTime = endTime - startTime;
    
    return {
      total: problems.length,
      correct,
      incorrectAttempts: totalIncorrectAttempts,
      incorrectAnswers: totalIncorrectAnswers,
      totalIncorrect,
      percentage,
      timeSpent: currentGameTime,
      cumulativeTime
    };
  }, [problems, answers, incorrectAttempts, startTime, endTime, cumulativeTime, gameStatus]);

  const resetGame = useCallback((resetStreak = true) => {
    setAnswers({});
    setIncorrectAttempts({});
    
    if (resetStreak) {
      setProblems([]);
      setStreak(0);
      setCumulativeTime(0);
      setGameStatus('idle');
      // Reset range values to defaults
      setLowerBound(2);
      setUpperBound(12);
      setLastRange(null);
    } else {
      // If maintaining streak, immediately start a new game with fresh problems
      startGame(); // This will call generateProblems and handle all necessary state updates
    }
  }, [startGame]);

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
    cumulativeTime,
    isRangeConsistent
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
