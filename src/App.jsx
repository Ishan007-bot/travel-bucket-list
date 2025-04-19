import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 transition-colors duration-200">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Travel Bucket List</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome to Travel Bucket List</h2>
                <p className="text-gray-600">Phase 1 setup complete - Basic project structure</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="bg-gray-100 p-4 text-center text-gray-600">
          <p>Travel Bucket List &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
