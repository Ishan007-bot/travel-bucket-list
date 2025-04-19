import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 dark:bg-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-bold ml-2 text-lg">Travel Bucket List</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/countries" className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium">
              Countries
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 