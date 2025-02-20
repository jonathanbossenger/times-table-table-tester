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
