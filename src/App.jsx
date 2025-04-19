import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TravelProvider } from './context/TravelContext';
import { Button, Spinner } from './components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CountryDetail from './pages/CountryDetail';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TravelProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">Welcome to Travel Bucket List</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Phase 3 complete - Enhanced UI Components</p>
                    
                    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">Implemented Features:</h3>
                      <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                        <li>✅ Responsive Navbar with mobile menu</li>
                        <li>✅ Feature-rich Footer</li>
                        <li>✅ Country card component with hover effects</li>
                        <li>✅ Reusable UI components:</li>
                        <ul className="ml-8 mt-2 space-y-2">
                          <li>- Buttons with multiple variants</li>
                          <li>- Form inputs with validation</li>
                          <li>- Loading spinners</li>
                          <li>- Modal dialogs</li>
                        </ul>
                        <li>✅ Dark/Light theme implementation</li>
                      </ul>
                    </div>
                    
                    <div className="mt-8 max-w-2xl mx-auto">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">Component Showcase:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h4 className="font-medium mb-3 dark:text-white">Buttons</h4>
                          <div className="space-y-2">
                            <div><Button variant="primary">Primary Button</Button></div>
                            <div><Button variant="secondary">Secondary Button</Button></div>
                            <div><Button variant="success">Success Button</Button></div>
                            <div><Button variant="danger">Danger Button</Button></div>
                            <div><Button variant="outline-primary">Outline Button</Button></div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h4 className="font-medium mb-3 dark:text-white">Loading Spinners</h4>
                          <div className="flex space-x-4 items-center">
                            <Spinner size="xs" variant="primary" />
                            <Spinner size="md" variant="primary" />
                            <Spinner size="sm" variant="success" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="/country/:countryCode" element={<CountryDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </TravelProvider>
    </ThemeProvider>
  );
}

export default App;
