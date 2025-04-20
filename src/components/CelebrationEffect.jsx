import React, { useEffect, useState } from 'react';

const CelebrationEffect = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState([]);
  const [active, setActive] = useState(false);
  
  // Generate particles when the celebration is activated
  useEffect(() => {
    if (isActive && !active) {
      setActive(true);
      generateParticles();
      
      // Clean up after animation finishes
      const timer = setTimeout(() => {
        setActive(false);
        setParticles([]);
        if (onComplete) onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, active, onComplete]);
  
  // Generate random confetti particles
  const generateParticles = () => {
    const newParticles = [];
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 40,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speed: 1 + Math.random() * 3
      });
    }
    
    setParticles(newParticles);
  };
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size * 1.5}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.8,
            boxShadow: `0 0 5px ${particle.color}`,
            animation: `fall ${3 / particle.speed}s linear forwards, fadeOut 0.5s ${2.5 / particle.speed}s forwards`
          }}
        />
      ))}
      
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-celebration">
        <div className="text-3xl sm:text-4xl font-bold text-white text-shadow-lg">
          Congratulations!
        </div>
        <div className="mt-2 text-xl sm:text-2xl text-white text-shadow-md">
          Another country visited!
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
          }
        }
        
        @keyframes fadeOut {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }
        
        .animate-fall {
          animation: fall 3s linear forwards;
        }
        
        .animate-celebration {
          animation: bounceIn 0.5s, fadeOut 0.5s 2.5s forwards;
        }
        
        @keyframes bounceIn {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        .text-shadow-lg {
          text-shadow: 0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6);
        }
        
        .text-shadow-md {
          text-shadow: 0 0 8px rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  );
};

export default CelebrationEffect; 