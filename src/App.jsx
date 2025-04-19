import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TravelProvider } from './context/TravelContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CountryDetail from './pages/CountryDetail';
import Home from './pages/Home';
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
                <Route path="/" element={<Home />} />
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
