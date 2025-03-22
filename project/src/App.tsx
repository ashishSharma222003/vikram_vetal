import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sword, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GameLevel } from './components/GameLevel';
import { Character } from './components/Character';
import { QuestionBox } from './components/QuestionBox';

// Types for API responses
interface Question {
  id: string;
  question: string;
  options: string[];
}

interface SubmissionResponse {
  passed: boolean;
  reason: string;
  improvement: string;
}

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch question for current level
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // TODO: Replace with your Flask API endpoint
        const response = await fetch(`/api/questions?level=${currentLevel}`);
        const data = await response.json();
        setCurrentQuestion(data);
      } catch (error) {
        console.error('Failed to fetch question:', error);
        // Fallback question in case API fails
        setCurrentQuestion({
          id: 'fallback',
          question: "What drives a true leader's decisions?",
          options: [
            "Personal gain",
            "The welfare of their people",
            "Military strength",
            "Ancient traditions"
          ]
        });
      }
    };

    fetchQuestion();
  }, [currentLevel]);

  const handleSubmit = async () => {
    if (!selectedAnswer || reasoning.length < 20 || !currentQuestion) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      // TODO: Replace with your Flask API endpoint
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          question: currentQuestion.question,
          level: currentLevel,
          answer: selectedAnswer,
          reasoning: reasoning,
        }),
      });

      const result: SubmissionResponse = await response.json();

      if (result.passed) {
        setFeedback({
          type: 'success',
          message: `${result.reason} ${result.improvement}`,
        });
      } else {
        setFeedback({
          type: 'error',
          message: `${result.reason} ${result.improvement}`,
        });
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setFeedback({
        type: 'error',
        message: 'Failed to submit answer. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden">
      {/* Pixelated background pattern */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553949345-eb786bb3f7ba')] bg-repeat opacity-10"
        style={{ imageRendering: 'pixelated', backgroundSize: '64px 64px' }}
      />
      
      {/* Game interface */}
      <div className="relative z-10 container mx-auto px-4 py-4">
        {/* Level indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-1">
          <div className="bg-[#000000] border-4 border-[#4a90e2] p-2">
            <Crown className="w-6 h-6 text-[#ffd700]" />
          </div>
          <div className="bg-[#000000] border-4 border-[#4a90e2] px-3 py-1">
            <span className="text-xl" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              Lv.{currentLevel}/32
            </span>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character section */}
          <Character />

          {/* Question section */}
          <div className="space-y-6">
            {currentQuestion && (
              <QuestionBox 
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={setSelectedAnswer}
              />
            )}

            {/* Reasoning input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#000000] border-4 border-[#4a90e2] p-4"
            >
              <label className="block text-lg mb-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                Your thoughts:
              </label>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                className="w-full h-32 bg-[#000000] border-4 border-[#4a90e2] p-3 
                         text-white placeholder-gray-500"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}
                placeholder="Enter your reasoning (20 chars min)"
              />
            </motion.div>

            {/* Feedback message */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-[#000000] border-4 ${
                    feedback.type === 'success' ? 'border-green-500' : 'border-red-500'
                  } p-4 flex flex-col gap-3`}
                >
                  <div className="flex items-start gap-3">
                    {feedback.type === 'success' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                    <p 
                      className="text-sm"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      {feedback.message}
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (feedback.type === 'success') {
                        setCurrentLevel(prev => Math.min(prev + 1, 32));
                        setSelectedAnswer(null);
                        setReasoning('');
                        setFeedback(null);
                      } else {
                        setCurrentLevel(1);
                        setSelectedAnswer(null);
                        setReasoning('');
                        setFeedback(null);
                      }
                    }}
                    className={`mt-3 w-full py-2 ${
                      feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    } border-2 border-b-4 ${
                      feedback.type === 'success' ? 'border-green-800' : 'border-red-800'
                    }`}
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    {feedback.type === 'success' ? 'CONTINUE' : 'TRY AGAIN'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!selectedAnswer || reasoning.length < 20 || isLoading}
              className="w-full bg-[#4a90e2] disabled:bg-gray-800 
                       border-4 border-b-8 border-[#2171c7] py-3
                       flex items-center justify-center gap-3"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              <Sword className="w-5 h-5" />
              {isLoading ? 'THINKING...' : 'CONFIRM'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;