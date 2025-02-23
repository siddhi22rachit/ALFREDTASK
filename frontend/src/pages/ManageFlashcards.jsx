import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const ManageCard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchFlashcards();
    }
  }, [user]);

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Flashcards</h2>
        <p className="text-gray-600 mb-4">Welcome, <span className="font-semibold">{user?.name || "Guest"}</span></p>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          Logout
        </button>

        <h3 className="text-xl font-semibold mt-6">Add New Flashcard</h3>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form onSubmit={handleAddCard} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Question"
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Answer"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Add Card
          </button>
        </form>

        <h3 className="text-xl font-semibold mt-6">Your Flashcards</h3>
        {cards.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {cards.map((card) => (
              <li key={card._id} className="bg-gray-200 p-4 rounded-md shadow-sm">
                <strong className="block text-gray-700">Q:</strong> {card.question} <br />
                <strong className="block text-gray-700 mt-2">A:</strong> {card.answer}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No flashcards available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCard;
