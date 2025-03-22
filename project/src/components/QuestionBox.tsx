import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface QuestionBoxProps {
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#000000] border-4 border-[#4a90e2] p-4"
    >
      <h3 
        className="text-xl mb-4 text-[#4a90e2]"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        {question}
      </h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectAnswer(option)}
            className={clsx(
              "w-full text-left p-3 transition-all duration-200 border-4",
              selectedAnswer === option
                ? "bg-[#4a90e2] border-[#2171c7] text-white"
                : "bg-[#000000] border-[#4a90e2] hover:bg-[#4a90e2]/10"
            )}
          >
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}>
              <span className="inline-block w-8 text-[#ffd700]">
                {String.fromCharCode(65 + index)}&gt;
              </span>
              {option}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};