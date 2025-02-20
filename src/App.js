import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GameProvider } from './context/GameContext';
import { ProblemSet } from './components/ProblemSet';
import { Navigation } from './components/Navigation';
import { Timer } from './components/Timer';
import { Layout } from './components/Layout';
import { Results } from './components/Results';

function App() {
  return (
    <HashRouter>
      <GameProvider>
        <Layout>
          <Navigation />
          <ProblemSet />
          <Timer />
          <Results />
        </Layout>
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
      </GameProvider>
    </HashRouter>
  );
}

export default App;
