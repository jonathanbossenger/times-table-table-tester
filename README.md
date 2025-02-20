# Times Table Tester

A React-based web application for practicing multiplication tables, featuring randomized questions, time tracking, and immediate feedback.

## Features

- **Customizable Practice Range**: Select which times tables to practice (1-12)
- **21 Randomized Problems**: Each session presents 21 unique multiplication problems
- **Real-time Validation**: Immediate feedback on correct/incorrect answers
- **Time Tracking**: Monitor how long it takes to complete the set
- **Keyboard Navigation**: Full keyboard support for efficient input
- **Progress Tracking**: Track correct answers and completion percentage
- **Responsive Design**: Clean, accessible interface using Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/times-table-tester.git
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

1. **Select Range**: Choose the times tables you want to practice using the "From" and "To" selectors
2. **Start Game**: Click "Start Game" to begin
3. **Answer Problems**: 
   - Type your answers in the input fields
   - Use Tab/Enter to move to the next problem
   - Use Shift+Tab/Up Arrow to move to the previous problem
4. **Complete Set**: After answering all problems, press Tab or Enter on the last problem
5. **View Results**: See your score, time taken, and accuracy

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

### User Interface
- Clean, minimalist design
- Real-time feedback
- Accessible navigation
- Clear visual indicators

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
