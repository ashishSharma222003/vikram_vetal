import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface GameLevelProps {
  level: number;
  maxLevel: number;
}

export const GameLevel: React.FC<GameLevelProps> = ({ level, maxLevel }) => {
  return (
    <div className="fixed top-4 left-4 flex items-center gap-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-black/50 p-2 rounded-lg flex items-center gap-2"
      >
        <Crown className="w-6 h-6 text-yellow-400" />
        <span className="text-xl font-bold">Level {level}</span>
        <span className="text-gray-400">/ {maxLevel}</span>
      </motion.div>
    </div>
  );
};