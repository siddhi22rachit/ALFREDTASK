import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [dueCards, setDueCards] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await fetch("http://localhost:5000/api/flashcards/date", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDueCards(data.length);
    };
    fetchFlashcards();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
          <p className="text-gray-300 text-lg mb-6">
            You have <span className="text-blue-400 font-bold">{dueCards}</span> flashcards due today
          </p>
          <Link 
            to={dueCards > 0 ? "/review" : "#"} // Prevent navigation if 0 cards
            className={`px-8 py-3 rounded-lg inline-block transition-colors ${
              dueCards > 0 
                ? "bg-blue-500 hover:bg-blue-600 text-white" 
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            style={{ pointerEvents: dueCards > 0 ? "auto" : "none" }} // Prevents clicks
            aria-disabled={dueCards === 0}
          >
            Start Reviewing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
