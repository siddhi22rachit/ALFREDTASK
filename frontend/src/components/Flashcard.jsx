import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const API_BASE_URL = "http://localhost:5000/api/flashcards";

const ManageFlashcards = () => {
  const { token } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchFlashcards();
  }, [token]);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFlashcard = async (e) => {
    e.preventDefault();
    if (!question || !answer) return alert("Both fields are required");

    try {
      const response = await axios.post(
        API_BASE_URL,
        { question, answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFlashcards([...flashcards, response.data]);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Flashcards</h2>

      {token ? (
        <>
          <form onSubmit={addFlashcard} className="mb-6">
            <input
              type="text"
              placeholder="Enter question"
              className="w-full p-2 border rounded mb-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter answer"
              className="w-full p-2 border rounded mb-2"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Flashcard
            </button>
          </form>

          {loading ? (
            <p>Loading flashcards...</p>
          ) : (
            <div>
              {flashcards.length === 0 ? (
                <p>No flashcards available.</p>
              ) : (
                flashcards.map((flashcard) => (
                  <div key={flashcard._id} className="p-4 border rounded mb-2">
                    <h3 className="font-semibold">{flashcard.question}</h3>
                    <p className="text-gray-600">{flashcard.answer}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500">Please login to manage flashcards.</p>
      )}
    </div>
  );
};

export default ManageFlashcards;
