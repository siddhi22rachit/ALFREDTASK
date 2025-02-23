import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const ReviewFlashcards = () => {
  const { token } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await fetch("http://localhost:5000/api/flashcards", {
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

    await fetch(`http://localhost:5000/api/flashcards/${currentCard._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ correct }),
    });

    const remainingCards = flashcards.slice(1);
    setFlashcards(remainingCards);
    setCurrentCard(remainingCards[0] || null);
    setShowAnswer(false);
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-3xl font-bold">Flashcard Review</h2>
      {currentCard ? (
        <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
          <p className="text-lg">{currentCard.question}</p>
          {showAnswer && <p className="text-xl font-bold mt-4">{currentCard.answer}</p>}
          <button onClick={() => setShowAnswer(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Show Answer</button>
          {showAnswer && (
            <div className="mt-4">
              <button onClick={() => handleAnswer(true)} className="bg-green-500 text-white px-4 py-2 mr-2 rounded-lg">Got it Right</button>
              <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Got it Wrong</button>
            </div>
          )}
        </div>
      ) : (
        <p>No more flashcards to review!</p>
      )}
    </div>
  );
};

export default ReviewFlashcards;
