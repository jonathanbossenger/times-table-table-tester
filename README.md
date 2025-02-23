# Times Table Tester

A React-based web application for practicing multiplication tables, featuring randomized questions, time tracking, and immediate feedback.

View live site [here](https://jonathanbossenger.github.io/times-table-tester/)

## Features

- **Customizable Practice Range**: Select which times tables to practice (2-12)
- **21 Randomized Problems**: Each session presents 21 unique multiplication problems
- **Real-time Validation**: Immediate feedback on correct/incorrect answers
- **Time Tracking**: Monitor how long it takes to complete the set
- **Keyboard Navigation**: Full keyboard support for efficient input
- **Progress Tracking**: Track correct answers and completion percentage
- **Responsive Design**: Clean, accessible interface using Tailwind CSS
- **Streak System**: Build streaks of perfect games and earn up to 5 stars
- **Cumulative Timer**: Track your total time across streak games
- **Motivational Messages**: Encouraging feedback based on streak progress

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jonathanbossenger/times-table-tester.git
cd times-table-tester
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## How to Use

1. **Select Range**: Choose the times tables you want to practice using the "From" and "To" selectors (2-12)
2. **Start Game**: Click "Start Game" to begin
3. **Answer Problems**: 
   - Type your answers in the input fields
   - Use Tab/Enter to move to the next problem
   - Use Shift+Tab/Up Arrow to move to the previous problem
4. **Complete Set**: After answering all problems, press Tab or Enter on the last problem
5. **View Results**: See your score, time taken, and accuracy
6. **Build Streaks**: 
   - Get all answers correct with no mistakes to earn a star
   - Continue with perfect games to earn up to 5 stars
   - Keep the same range settings to maintain your streak
   - Watch your cumulative streak time grow

## Keyboard Shortcuts

- `Tab` or `Enter`: Move to next problem
- `Shift + Tab` or `Up Arrow`: Move to previous problem
- `Tab` or `Enter` on last problem: Complete the game (when all answers are filled)

## Technologies Used

- React
- React Router
- Tailwind CSS
- React Hot Toast
- Headless UI

## Project Structure

```
src/
├── components/
│   ├── Layout/       # Main layout wrapper
│   ├── Timer/        # Time tracking display
│   ├── ProblemSet/   # Problem grid container
│   ├── Problem/      # Individual problem component
│   ├── Modal/        # Instructions and results modals
│   ├── Navigation/   # Range selection controls
│   └── Results/      # Completion results display
├── hooks/
│   ├── useTimer.js   # Timer logic
│   ├── useFocus.js   # Focus management
│   └── useValidation.js # Answer validation
└── context/
    └── GameContext.js # Game state management
```

## Features in Detail

### Problem Generation
- Generates exactly 21 problems
- Displays in a fixed 3-column grid
- Randomly selects from chosen range
- Shows multiplication equations (e.g., 4 × 7 = )

### Scoring System
- Tracks correct/incorrect answers
- Calculates percentage score
- Records completion time
- Displays results in modal
- Tracks perfect game streaks
- Shows cumulative streak time

### Streak System
- Earn stars (⭐) for perfect games
- Build streaks up to 5 stars
- Perfect game requirements:
  - All answers correct
  - No incorrect attempts
  - Same range settings
- Streak breaks if you:
  - Make any mistakes
  - Change range settings
  - Complete a 5-star streak
- Track total time across streak games

### User Interface
- Clean, minimalist design
- Real-time feedback
- Accessible navigation
- Clear visual indicators
- Motivational messages
- Star rating display
- Streak time tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v2.0 or later - see the LICENSE file for details.

This program is free software; you can redistribute it and/or modify it under the terms
of the GNU General Public License as published by the Free Software Foundation; either
version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details.
