import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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
    <div className="text-center p-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-lg my-4">You have {dueCards} flashcards due today</p>
      <Link to="/review" className="bg-blue-500 text-white px-6 py-3 rounded-lg">Start Reviewing</Link>
    </div>
  );
};

export default Dashboard;
