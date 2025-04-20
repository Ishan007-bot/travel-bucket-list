import React, { useState } from 'react';
import { Button } from './index';

const TravelTips = ({ countryName, countryCode, region }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Generate mock travel tips based on country information
  const travelTips = generateTips(countryName, countryCode, region);
  
  // Toggle expanded category
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  
  return (
    <div className="space-y-4">
      {Object.entries(travelTips).map(([category, tips]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <button
            className="w-full p-4 flex justify-between items-center focus:outline-none"
            onClick={() => toggleCategory(category)}
          >
            <h4 className="font-medium text-gray-800 dark:text-white flex items-center">
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </h4>
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                expandedCategory === category ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            className={`px-4 pb-4 ${expandedCategory === category ? 'block' : 'hidden'}`}
          >
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {tips.map((tip, index) => (
                <li key={index} className="flex">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 italic text-center">
        Note: These travel tips are generated for demo purposes and may not reflect current conditions.
        Always consult official travel advisories before planning your trip.
      </div>
    </div>
  );
};

// Helper function to generate category icon
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Local Customs':
      return (
        <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'Getting Around':
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 'Safety':
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case 'Best Time to Visit':
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'Food & Drink':
      return (
        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

// Helper function to generate mock travel tips
const generateTips = (countryName, countryCode, region) => {
  // For demo purposes, create region-specific travel tips
  // In a real application, these would come from an API or database
  
  const tips = {
    'Local Customs': [
      `Greeting people in ${countryName} often involves a handshake and direct eye contact.`,
      `When visiting religious sites in ${countryName}, dress modestly and be respectful of local customs.`,
      `It's considered polite to learn a few basic phrases in the local language.`,
      `Tipping practices vary, but 10-15% is generally appreciated for good service.`
    ],
    'Getting Around': [
      `Public transportation in ${countryName} is ${region === 'Europe' || region === 'Asia' ? 'well-developed' : 'available in major cities'}.`,
      `Renting a car is ${region === 'Europe' || region === 'Oceania' ? 'a good option for exploring rural areas' : 'recommended with caution due to varying road conditions'}.`,
      `Taxis are ${region === 'Americas' || region === 'Europe' ? 'readily available and generally safe' : 'available but negotiate the fare beforehand'}.`,
      `Walking is a great way to explore the cities and towns of ${countryName}.`
    ],
    'Safety': [
      `${countryName} is generally ${region === 'Europe' || region === 'Oceania' ? 'safe for tourists' : 'safe in tourist areas, but exercise caution in remote regions'}.`,
      `Keep your valuables secure and be aware of your surroundings, especially in crowded areas.`,
      `It's advisable to have travel insurance that covers medical emergencies.`,
      `Register with your embassy or consulate upon arrival for extended stays.`
    ],
    'Best Time to Visit': [
      region === 'Europe' || region === 'North America' 
        ? `Summer (June-August) offers warm weather and numerous festivals.`
        : region === 'Oceania' || region === 'South America'
        ? `December to February provides ideal weather conditions.`
        : `The dry season (varies by location) is generally the best time to visit.`,
      `Shoulder seasons (spring/fall) often offer good weather with fewer tourists.`,
      `Check for local festivals or events that might enhance your visit.`,
      `Weather can be unpredictable, so pack accordingly.`
    ],
    'Food & Drink': [
      `Don't miss trying the local ${region === 'Asia' ? 'street food' : region === 'Europe' ? 'cuisine in local restaurants' : 'delicacies'}.`,
      `Drinking tap water is ${region === 'Europe' || region === 'North America' || region === 'Oceania' ? 'generally safe' : 'not recommended in most areas'}.`,
      `Food markets are great places to experience local flavors and ingredients.`,
      `Respect local dining customs and table manners.`
    ]
  };
  
  return tips;
};

export default TravelTips; 