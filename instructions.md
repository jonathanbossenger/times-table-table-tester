# Times Table Tester - Development Instructions

## Setup Steps

### 1. Project Initialization
```bash
# Create a new React project
npx create-react-app times-table-tester

# Navigate to project directory
cd times-table-tester

# Install required dependencies
npm install react-router-dom @hookform/resolvers react-hook-form tailwindcss @headlessui/react react-hot-toast
```

### 2. Configure TailwindCSS
```bash
# Initialize Tailwind CSS
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
      }
    }
  },
  plugins: [],
}
```

### 3. Project Structure
Create the following folder structure:
```
src/
├── components/
│   ├── Layout/
│   ├── Timer/
│   ├── ProblemSet/
│   ├── Problem/
│   ├── Modal/
│   ├── Navigation/
│   └── Results/
├── hooks/
│   ├── useTimer.js
│   ├── useFocus.js
│   ├── useValidation.js
│   └── useAnswerTracking.js
├── context/
│   └── GameContext.js
└── utils/
    ├── numberGenerator.js
    └── validation.js
```

## Core Features

### Streak System
- Tracks consecutive perfect games up to 5 stars
- Perfect game requirements:
  - All 21 answers must be correct
  - No incorrect attempts during gameplay
  - Range settings must remain consistent throughout streak
- Star Rating Display:
  - Shows ☆ for potential stars
  - Shows ⭐ for earned stars (1-5)
  - Resets to 0 after achieving 5 stars
- Streak Timer:
  - Accumulates time across streak games
  - Only displays after completing first game in streak
  - Continues counting during active streak
  - Resets when streak breaks or after 5 stars
- Motivational Messages:
  - Different message for each star level
  - Special message for 5-star achievement
- Range Consistency:
  - Must maintain same range settings during streak
  - Default range is 2-12
  - Changing range breaks streak
  - Range resets to default after streak completion
- Game Flow During Streak:
  - Perfect game -> Immediate next game
  - Failed game -> Return to range selection
  - 5 stars -> Return to range selection

### Implementation Details
1. State Management:
  ```javascript
  // Streak-related state
  const [streak, setStreak] = useState(0);
  const [lastRange, setLastRange] = useState(null);
  const [cumulativeTime, setCumulativeTime] = useState(0);
  ```

2. Range Tracking:
  ```javascript
  const isRangeConsistent = () => {
    if (!lastRange) return true;
    return lastRange.lower === lowerBound && 
           lastRange.upper === upperBound;
  };
  ```

3. Perfect Game Detection:
  ```javascript
  const isPerfect = correct === problems.length && 
                    !hasIncorrectAttempts;
  ```

4. Streak Updates:
  ```javascript
  if (isPerfect && isRangeConsistent()) {
    const newStreak = streak + 1;
    setStreak(newStreak > 5 ? 5 : newStreak);
    setCumulativeTime(cumulativeTime + currentGameTime);
  } else {
    setStreak(0);
    setCumulativeTime(0);
  }
  ```

5. Game Reset Logic:
  ```javascript
  const resetGame = (resetStreak = true) => {
    if (resetStreak) {
      setStreak(0);
      setCumulativeTime(0);
      setLowerBound(2);
      setUpperBound(12);
    } else {
      startGame(); // Continue streak
    }
  };
  ```

### User Interface Elements
1. Star Rating Display:
  ```javascript
  const StarRating = ({ streak }) => (
    <div className="flex justify-center space-x-2">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < streak ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
  ```

2. Streak Messages:
  ```javascript
  const getStreakMessage = (streak) => {
    switch(streak) {
      case 5: return "Perfect Streak! You're a Times Tables Master! 🏆";
      case 4: return "Amazing! One more for ultimate achievement! 🌟";
      case 3: return "Fantastic! You're on fire! 🔥";
      case 2: return "Great work! Three more to go! ✨";
      case 1: return "Excellent start! Keep going! 💫";
      default: return "";
    }
  };
  ```

3. Timer Display:
  ```javascript
  // Show cumulative time only during active streak
  {streak > 0 && (
    <div className="text-xl font-mono">
      Total Streak Time: {formatTime(cumulativeTime)}
    </div>
  )}
  ```

## Development Steps

### 1. Set Up Context
1. Create game context in `context/GameContext.js`:
```javascript
// Basic context setup with problem generation logic
```

### 2. Create Custom Hooks
1. Timer Hook (`hooks/useTimer.js`):
```javascript
// Implement timer logic with start/stop/reset
```

2. Focus Management (`hooks/useFocus.js`):
```javascript
// Handle input focus and navigation
```

3. Validation Hook (`hooks/useValidation.js`):
```javascript
// Implement answer validation logic
```

### 3. Build Core Components

1. Start with the Problem Component:
```javascript
// components/Problem/index.js
// Single problem display with input handling
```

2. Create ProblemSet Component:
```javascript
// components/ProblemSet/index.js
// Container for all problems
```

3. Implement Timer Component:
```javascript
// components/Timer/index.js
// Display and manage timer
```

### 4. Implement Navigation and Routing

1. Set up React Router in `App.js`:
```javascript
// Basic routing setup with limit parameter handling
```

2. Create Navigation Component:
```javascript
// components/Navigation/index.js
// Table size selection links
```

### 5. Add User Interface Elements

1. Create Modal Component:
```javascript
// components/Modal/index.js
// Instructions and settings modal
```

2. Implement Layout Component:
```javascript
// components/Layout/index.js
// Common layout wrapper
```

### 6. Add Validation and Focus Logic

1. Update Problem Component:
```javascript
// Add real-time validation
// Implement Tab/Enter key handling
// Add focus management
```

2. Update ProblemSet Component:
```javascript
// Add completion tracking
// Implement focus trap
```

### 7. Add Styling and Polish

1. Style components using Tailwind classes:
```javascript
// Add responsive grid layout
// Implement color feedback
// Add focus indicators
```

2. Add Toast notifications:
```javascript
// Implement success/failure messages
```

### 8. Implement Streak System

1. Update GameContext:
```javascript
// Add streak state and persistence
const [streak, setStreak] = useState(0);

// Load streak from localStorage on mount
useEffect(() => {
  const savedStreak = localStorage.getItem('mathStreak');
  if (savedStreak) {
    setStreak(parseInt(savedStreak, 10));
  }
}, []);

// Save streak to localStorage when it changes
useEffect(() => {
  if (streak > 0) {
    localStorage.setItem('mathStreak', streak.toString());
  } else {
    localStorage.removeItem('mathStreak');
  }
}, [streak]);
```

2. Update Results Component:
```javascript
// Add star rating display
const StarRating = ({ streak }) => (
  <div className="flex justify-center space-x-2 mt-6">
    {[...Array(5)].map((_, index) => (
      <span key={index} className="text-2xl">
        {index < streak ? '⭐' : '☆'}
      </span>
    ))}
  </div>
);

// Add motivational messages
const getStreakMessage = (streak) => {
  switch(streak) {
    case 5: return "Perfect Streak! You're a Times Tables Master! 🏆";
    case 4: return "Amazing! Just one more perfect game for the ultimate achievement! 🌟";
    case 3: return "Fantastic! You're on fire! Keep going for that perfect streak! 🔥";
    case 2: return "Great work! You're building momentum! Three more to go! ✨";
    case 1: return "Excellent start! Keep practicing for a perfect streak! 💫";
    default: return "";
  }
};
```

### 9. Enhance Error Tracking

1. Update GameContext:
```javascript
// Add incorrect attempts tracking
const [incorrectAttempts, setIncorrectAttempts] = useState({});

// Track incorrect attempts when leaving a problem
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
```

2. Update Score Calculation:
```javascript
const getScore = useCallback(() => {
  let correct = 0;
  let totalIncorrectAttempts = 0;
  
  problems.forEach(problem => {
    const userAnswer = answers[problem.id];
    const attempts = incorrectAttempts[problem.id] || 0;
    totalIncorrectAttempts += attempts;

    if (typeof userAnswer === 'number' && userAnswer === problem.answer) {
      correct++;
    }
  });

  const totalIncorrectAnswers = problems.length - correct;
  const totalIncorrect = Math.max(totalIncorrectAnswers, totalIncorrectAttempts);
  const percentage = Math.round((correct / (correct + totalIncorrect)) * 100);
  
  return {
    total: problems.length,
    correct,
    incorrectAttempts: totalIncorrectAttempts,
    incorrectAnswers: totalIncorrectAnswers,
    percentage,
    timeSpent: endTime - startTime
  };
}, [problems, answers, incorrectAttempts, startTime, endTime]);
```

### 10. Add UI Enhancements

1. Add GitHub Link to Layout:
```javascript
<a
  href="https://github.com/yourusername/times-table-tester"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
>
  <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
  <span>View on GitHub</span>
</a>
```

2. Configure Toast Notifications:
```javascript
// Add Toaster to App.js
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 5000,
      iconTheme: {
        primary: '#4ade80',
        secondary: '#fff',
      },
    },
  }}
/>

// Use toast notifications
toast.success(
  `Completed! Score: ${score.correct}/${score.total} (${score.percentage}%)`,
  { duration: 5000 }
);
```

### 11. Implement Navigation Improvements

1. Add Reset Button to Layout:
```javascript
{gameStatus !== 'idle' && (
  <button
    onClick={resetGame}
    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
  >
    Reset
  </button>
)}
```

2. Add Range Validation:
```javascript
const handleUpperBoundChange = (e) => {
  const value = parseInt(e.target.value, 10);
  if (value >= lowerBound) {
    setUpperBound(value);
  }
};

const handleStartGame = () => {
  if (lowerBound > upperBound) {
    alert('Lower bound must be less than or equal to upper bound');
    return;
  }
  startGame();
};
```

### 12. Testing Additional Features

1. Test Streak System:
```javascript
// Test streak persistence
test('streak persists in localStorage', () => {
  // Add test implementation
});

// Test perfect game detection
test('perfect game increases streak', () => {
  // Add test implementation
});
```

2. Test Error Tracking:
```javascript
// Test incorrect attempts tracking
test('tracks incorrect attempts separately', () => {
  // Add test implementation
});

// Test score calculation with attempts
test('score includes incorrect attempts', () => {
  // Add test implementation
});
```

Remember to:
- Test all new features thoroughly
- Update documentation with new features
- Ensure backward compatibility
- Optimize performance for new features
- Follow accessibility guidelines
- Keep the codebase clean and maintainable

## Testing Steps

1. Create test cases for core functionality:
```javascript
// Test problem generation
// Test answer validation
// Test timer functionality
```

2. Test user interactions:
```javascript
// Test keyboard navigation
// Test focus management
// Test completion flow
```

## Deployment Steps

1. Build and optimize:
```bash
# Run build with optimization
npm run build
```

2. Test production build:
```bash
# Serve production build locally
npx serve -s build
```

## Development Tips

1. **Component Development Order**
   - Start with the Problem component
   - Then ProblemSet
   - Add Timer
   - Finally, add Navigation and Modal

2. **State Management Tips**
   - Use Context for game state
   - Use local state for UI interactions
   - Use URL state for table size

3. **Testing Strategy**
   - Test each hook independently
   - Test components in isolation
   - Add integration tests for key flows

4. **Performance Optimization**
   - Memoize expensive calculations
   - Use React.memo for pure components
   - Implement lazy loading for Modal

## Common Pitfalls to Avoid

1. **State Management**
   - Don't duplicate state between context and components
   - Use proper state initialization

2. **Focus Management**
   - Handle edge cases (first/last input)
   - Consider keyboard navigation accessibility

3. **Performance**
   - Avoid unnecessary re-renders
   - Don't put large objects in state

4. **Validation**
   - Handle all input types (numeric, empty)
   - Consider mobile keyboard variations

## Next Steps

1. **Basic Version**
   - Implement core features
   - Add basic styling
   - Test core functionality

2. **Enhanced Version**
   - Add animations
   - Implement dark mode
   - Add keyboard shortcuts

3. **Production Version**
   - Add error boundaries
   - Implement analytics
   - Add PWA support

Remember to commit your code frequently and write clear commit messages. Use JavaScript strictly to catch errors early in development. 
