// ManageCard.jsx
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ManageCard = () => {
  const { token } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetchFlashcards();
    }
  }, [token]);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/flashcards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setCards(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCard),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setCards([...cards, data]);
      setNewCard({ question: "", answer: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Manage Flashcards</h2>
          
          {error && <p className="text-red-400 mb-4">{error}</p>}
          
          <form onSubmit={handleAddCard} className="mb-8">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Question"
                value={newCard.question}
                onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Answer"
                value={newCard.answer}
                onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                required
              />
              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
              >
                Add Card
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card._id} className="bg-gray-700 p-4 rounded-lg">
                <p className="text-white"><strong>Que:</strong> {card.question}</p>
                <p className="text-gray-300 mt-2"><strong>Ans:</strong> {card.answer}</p>
                <p className="text-gray-300 mt-2"><strong>Ans:</strong> {card.nextReviewDate}</p>
              </div>
            ))}
            {cards.length === 0 && (
              <p className="text-gray-400">No flashcards available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCard;
