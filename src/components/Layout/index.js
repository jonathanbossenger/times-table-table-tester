import React from 'react';
import { useGame } from '../../context/GameContext';
import { Modal } from '../Modal';
import { Instructions } from '../Modal/Instructions';
import { Menu } from '@headlessui/react';

export function Layout({ children }) {
  const { gameStatus, resetGame } = useGame();
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Times Table Tester</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowInstructions(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Instructions
            </button>
            {gameStatus !== 'idle' && (
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            )}
            {/*
            <Menu as="div" className="relative">
              <Menu.Button className="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  Placeholder for future menu items
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      >
                        Login to save your results
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            */}
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
        <Instructions isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
      </Modal>
    </div>
  );
} 
