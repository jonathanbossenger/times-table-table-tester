export function Instructions({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-6">How to Play</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">Basic Rules</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Select your times tables range (2-12)</li>
              <li>Complete the multiplication problems</li>
              <li>Type your answer and press Tab or Enter to move to the next problem</li>
              <li>Use Shift+Tab or Up Arrow to go back to the previous problem</li>
              <li>The timer starts when you begin typing</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Streak System</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Earn stars (⭐) by achieving perfect games</li>
              <li>A perfect game requires:
                <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                  <li>All answers correct</li>
                  <li>No incorrect attempts</li>
                </ul>
              </li>
              <li>Build your streak up to 5 stars</li>
              <li>Your streak breaks if you:
                <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                  <li>Make any mistakes</li>
                  <li>Reset the game</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
} 
