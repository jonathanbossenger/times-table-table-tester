import React from 'react';
import { useGame } from '../../context/GameContext';
import { Modal } from '../Modal';

export function Layout({ children }) {
  const { gameStatus, resetGame } = useGame();
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
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
