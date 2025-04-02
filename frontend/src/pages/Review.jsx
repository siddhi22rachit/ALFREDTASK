import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { ThumbsDown } from "lucide-react";
import Navbar from "../components/Navbar";

const Confetti = () => {
  // Increased number of confetti pieces
  const confettiElements = Array.from({ length: 150 }).map((_, i) => {
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
    const shapes = ['rounded-full', 'rounded-sm', 'rotate-45'];
    const sizes = ['w-2 h-2', 'w-3 h-3', 'w-4 h-4'];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 1;
    const startingY = 20 + Math.random() * 60; // Random starting position
    
    return (
      <motion.div
        key={i}
        className={`absolute ${randomColor} ${randomShape} ${randomSize}`}
        initial={{ 
          top: `${startingY}vh`,
          left: `${randomLeft}vw`,
          opacity: 0,
          scale: 0
        }}
        animate={{ 
          top: `${Math.random() * -20}vh`,
          left: `${randomLeft + (Math.random() * 40 - 20)}vw`,
          opacity: [0, 1, 1, 0],
          scale: [0, 1, 1, 0],
          rotate: Math.random() * 720 - 360
        }}
        transition={{ 
          duration: 2.5 + Math.random() * 1,
          delay: randomDelay,
          ease: "easeOut"
        }}
      />
    );
  });

  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{confettiElements}</div>;
};

const ThumbsDownEffect = () => {
  const thumbsElements = Array.from({ length: 25 }).map((_, i) => {
    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 0.5;
    const size = 30 + Math.random() * 40;
    
    return (
      <motion.div
        key={i}
        className="absolute text-red-500"
        initial={{ 
          top: "100vh",
          left: `${randomLeft}vw`,
          opacity: 0
        }}
        animate={{ 
          top: "0vh",
          opacity: [0, 1, 1, 0],
          scale: [1, 1.2, 1.2, 1],
          rotate: Math.random() * 360
        }}
        transition={{ 
          duration: 2,
          delay: randomDelay,
          ease: "easeOut"
        }}
      >
        <ThumbsDown size={size} />
      </motion.div>
    );
  });

  return <div className="fixed inset-0 pointer-events-none">{thumbsElements}</div>;
};

const ReviewFlashcards = () => {
  const { token } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await fetch("https://alfredtask-sepia.vercel.app/api/flashcards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFlashcards(data);
      setCurrentCard(data[0] || null);
    };
    fetchFlashcards();
  }, [token]);

  const handleAnswer = async (correct) => {
    if (!currentCard) return;

    if (correct) {
      setShowSuccess(true);
    } else {
      setShowError(true);
    }

    await fetch(`http://https://alfredtask-sepia.vercel.app/api/flashcards/${currentCard._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ correct }),
    });

    setTimeout(() => {
      const remainingCards = flashcards.slice(1);
      setFlashcards(remainingCards);
      setCurrentCard(remainingCards[0] || null);
      setShowAnswer(false);
      setShowSuccess(false);
      setShowError(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Navbar/>
      <AnimatePresence>
        {showSuccess && <Confetti />}
        {showError && <ThumbsDownEffect />}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto relative">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 text-blue-400"
          animate={showSuccess ? {
            scale: [1, 1.2, 1],
            color: ['#60A5FA', '#34D399', '#60A5FA']
          } : {}}
          transition={{ duration: 0.5 }}
        >
          Flashcard Review
        </motion.h1>

        <AnimatePresence mode="wait">
          {currentCard ? (
            <motion.div
              key={currentCard._id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <motion.div
                className="text-xl mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentCard.question}
              </motion.div>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="text-lg text-blue-400 mb-6"
                  >
                    {currentCard.answer}
                  </motion.div>
                )}
              </AnimatePresence>

              {!showAnswer ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAnswer(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Show Answer
                </motion.button>
              ) : (
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(true)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                    disabled={showSuccess || showError}
                  >
                    Got it Right
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(false)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                    disabled={showSuccess || showError}
                  >
                    Got it Wrong
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl text-center text-gray-400"
            >
              No more flashcards to review!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewFlashcards;