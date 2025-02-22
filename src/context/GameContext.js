import { createContext, useContext, useState, useCallback } from 'react';

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
    
    console.log(`Submitting answer for problem ${problemId}:`, {
      userAnswer: numericAnswer,
      correctAnswer: problem?.answer,
      isCorrect: numericAnswer === problem?.answer,
      incorrectAttempts: incorrectAttempts[problemId] || 0
    });

    setAnswers(prev => ({
      ...prev,
      [problemId]: numericAnswer
    }));
  }, [problems, incorrectAttempts]);

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
      
      setGameStatus('completed');
      setEndTime(Date.now());
      return true;
    }
    return false;
  }, [answers, problems, trackIncorrectAttempt]);

  const getScore = useCallback(() => {
    if (gameStatus !== 'completed') return null;

    let correct = 0;
    let totalIncorrectAttempts = 0;
    
    problems.forEach(problem => {
      const userAnswer = answers[problem.id];
      const attempts = incorrectAttempts[problem.id] || 0;
      totalIncorrectAttempts += attempts;

      // Only count answers that exist and are numbers
      if (typeof userAnswer === 'number' && !isNaN(userAnswer)) {
        if (userAnswer === problem.answer) {
          correct++;
        }
        console.log(`Problem ${problem.id}: ${problem.multiplicand} × ${problem.multiplier} = ${problem.answer}`, {
          userAnswer,
          isCorrect: userAnswer === problem.answer,
          incorrectAttempts: attempts
        });
      }
    });

    // Calculate total incorrect answers (problems - correct)
    const totalIncorrectAnswers = problems.length - correct;
    
    // Use the greater number between incorrect answers and attempts
    const totalIncorrect = Math.max(totalIncorrectAnswers, totalIncorrectAttempts);

    console.log('Final Score Calculation:', {
      totalProblems: problems.length,
      answeredProblems: Object.keys(answers).length,
      correctAnswers: correct,
      totalIncorrectAnswers,
      totalIncorrectAttempts,
      finalTotalIncorrect: totalIncorrect,
      incorrectAttemptsPerProblem: incorrectAttempts,
      answers,
      problems: problems.map(p => ({ 
        id: p.id, 
        equation: `${p.multiplicand} × ${p.multiplier}`,
        correctAnswer: p.answer,
        userAnswer: answers[p.id],
        incorrectAttempts: incorrectAttempts[p.id] || 0
      }))
    });
    
    // Calculate percentage based on correct answers out of total possible points
    // where total possible points is correct + max(incorrectAttempts, incorrectAnswers)
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

  const resetGame = useCallback(() => {
    setProblems([]);
    setAnswers({});
    setIncorrectAttempts({});
    setGameStatus('idle');
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
