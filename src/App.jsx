import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TravelProvider } from './context/TravelContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TravelProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <header className="bg-blue-600 text-white p-4 dark:bg-blue-800">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Travel Bucket List</h1>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">Welcome to Travel Bucket List</h2>
                    <p className="text-gray-600 dark:text-gray-300">Phase 2 complete - API Integration & Data Modeling</p>
                    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">Implemented Features:</h3>
                      <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                        <li>✅ REST Countries API integration</li>
                        <li>✅ API service functions for fetching countries</li>
                        <li>✅ Global state management with Context API</li>
                        <li>✅ Local storage persistence for saved countries</li>
                        <li>✅ Theme context for light/dark mode</li>
                        <li>✅ Data fetching hooks with loading states</li>
                        <li>✅ Utility functions for data formatting</li>
                      </ul>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-gray-600 dark:text-gray-300">
              <p>Travel Bucket List &copy; {new Date().getFullYear()}</p>
            </footer>
          </div>
        </Router>
      </TravelProvider>
    </ThemeProvider>
  );
}

export default App;
