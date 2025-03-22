import React from 'react';
import { motion } from 'framer-motion';

export const Character: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center"
    >
      {/* Character portrait with pixelated effect */}
      <div className="relative">
        <div className="w-64 h-64 border-4 border-[#4a90e2] overflow-hidden bg-black">
          <img
            src="sage_art.jpeg"
            alt="Sage Advisor"
            className="w-full h-full object-cover"
            style={{ 
              imageRendering: 'pixelated',
              filter: 'brightness(0.8) contrast(1.2) sepia(0.3)'
            }}
          />
        </div>
      </div>
      
      {/* Character info */}
      <div className="mt-4 text-center">
        <h2 
          className="text-2xl text-[#4a90e2] mb-1"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          SAGE ALDRICH
        </h2>
        <p 
          className="text-gray-400"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
        >
          ROYAL ADVISOR
        </p>
      </div>

      {/* Classic RPG dialogue box */}
      <div className="mt-4 w-full">
        <div className="bg-[#000000] border-4 border-[#4a90e2] p-4">
          <p 
            className="leading-relaxed"
            style={{ 
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '12px',
              lineHeight: '2'
            }}
          >
            Seeker of wisdom...
            Answer with truth and
            advance thy quest.
          </p>
        </div>
      </div>
    </motion.div>
  );
};