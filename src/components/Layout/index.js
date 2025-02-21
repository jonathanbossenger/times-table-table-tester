import React from 'react';
import { useGame } from '../../context/GameContext';
import { Modal } from '../Modal';

export function Layout({ children }) {
  const { gameStatus, resetGame } = useGame();
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Times Table Tester</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowInstructions(true)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Instructions
            </button>
            {gameStatus !== 'idle' && (
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <a
        href="https://github.com/jonathanbossenger/times-table-tester"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-5 h-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <span>View on GitHub</span>
      </a>

      <Modal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="How to Play"
      >
        <div className="prose">
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>Select your times tables range (e.g., from 4 to 7)</li>
            <li>Press Start Game when ready</li>
            <li>Enter the correct product for each multiplication problem</li>
            <li>Use Tab or Enter to move to the next problem</li>
            <li>Use Shift+Tab or Up Arrow to move to the previous problem</li>
            <li>Complete all problems to finish the game</li>
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setShowInstructions(false)}
          >
            Got it!
          </button>
        </div>
      </Modal>
    </div>
  );
} 
