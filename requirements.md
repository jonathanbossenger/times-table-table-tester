# Times Table Tester Requirements

## Overview
A React-based web application for practicing multiplication tables with randomized questions and time tracking, styled with TailwindCSS.

## Core Features

### Problem Generation
- Always generates exactly 21 problems
- Problems are displayed in a fixed 3x3 grid layout
- Problems are randomly selected from the chosen times tables range
- Each problem shows a multiplication equation (e.g., 4 × 7 = )

### Times Tables Range Selection
- Users can select a lower and upper bound for times tables
- Range is from 1 to 12 for both bounds
- Lower bound must be less than or equal to upper bound
- Selection is only available before starting the game

### Game Flow
1. User selects times tables range
2. User clicks "Start Game" button (located next to range selectors)
3. Timer starts automatically
4. User completes multiplication problems
5. Game ends automatically when:
   - All problems are answered and
   - User hits Tab or Enter on the last problem

### Input and Navigation
- Numeric input only
- Tab/Enter to move to next problem
- Shift+Tab/Up Arrow to move to previous problem
- Real-time validation of answers
- Visual feedback for correct/incorrect answers
- Automatic game completion on last problem navigation

### Scoring
- Tracks number of correct answers
- Calculates percentage score
- Records time taken to complete
- Shows results in modal after completion

## UI Components

### Navigation Bar
- Times tables range selectors (From/To dropdowns)
- Start Game button
- Hidden during gameplay

### Header
- Title "Times Table Tester"
- Instructions button
- Reset button (only visible during gameplay)

### Problem Display
- Fixed 3-column grid
- 21 problems total (7 rows)
- Each problem has:
  - Equation display
  - Input field
  - Visual feedback

### Timer
- Shows elapsed time
- Format: MM:SS
- Fixed position in top-right corner
- Only visible during gameplay

### Results Modal
- Shows on completion
- Displays:
  - Percentage score
  - Number of correct answers
  - Number of incorrect answers
  - Time taken
  - Play Again button

### Instructions Modal
- Accessible via Instructions button
- Shows how to:
  - Select range
  - Navigate problems
  - Complete the game

## Technical Requirements

### State Management
- Game status (idle/playing/completed)
- Problem set
- User answers
- Timer state
- Range selection

### Validation
- Input validation (numbers only)
- Range validation
- Answer checking
- Completion tracking

### Accessibility
- Keyboard navigation
- ARIA labels
- Focus management
- Clear visual feedback

### Responsive Design
- Fixed 3-column layout
- Consistent spacing
- Mobile-friendly input
- Readable typography

## User Experience

### Feedback
- Real-time answer validation
- Visual feedback for:
  - Correct/incorrect answers
  - Current input focus
  - Game completion
- Toast notifications for completion

### Error Handling
- Invalid range selection
- Invalid input prevention
- Graceful state management
- Clear error messages

### Performance
- Immediate input response
- Smooth navigation
- Efficient problem generation
- Clean state updates

## Educational Goals
- Provide randomized questions for better learning
- Track completion time using React hooks
- Give immediate feedback using React state
- Allow configurable difficulty through React Router parameters
- Present clear instructions using React components
- Support offline usage via service workers (optional)
- Encourage quick mental calculations through immediate feedback

## URL Parameters
- `limit`: Sets the number of multiplication problems (1-20)
  - Default: 10
  - Example: `/practice?limit=15` generates 15 problems
- Parameters handled via React Router hooks

## Performance Requirements
- React Suspense for code splitting
- Lazy loading of non-critical components
- Memoization of expensive calculations
- Responsive design using Tailwind breakpoints
- Efficient React renders using proper hooks and memoization
- Minimal layout shifts during interaction
- Support for modern browsers (last 2 versions)
- Immediate input validation feedback

## Component Structure
- App (root component)
  - Layout (common layout wrapper)
  - Timer (custom hook and component)
  - ProblemSet (manages problem generation)
  - Problem (individual problem component with validation)
  - Modal (instructions and settings)
  - Navigation (table size selection)
  - Results (completion display)
  - FocusManager (handles input focus logic)

## State Management
- React Context for global state
- Local component state for UI interactions
- URL state via React Router
- Form state via React Hook Form
- Focus state management
- Completion tracking state

## Optional Enhancements
- Progressive Web App (PWA) support
- Local storage for saving best times using custom hooks
- Additional keyboard shortcuts for power users
- Dark mode using Tailwind dark mode classes
- Animation using Tailwind animation classes
- Accessibility features using React-Aria
