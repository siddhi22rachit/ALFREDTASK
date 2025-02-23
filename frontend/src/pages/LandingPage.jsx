import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <h1 className="text-5xl font-bold text-white mb-8 animate-fade-in">
          Welcome to <span className="text-blue-400">Flashcard App</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl text-center animate-fade-in">
          Boost your learning journey with our interactive flashcard system.
        </p>
        <div className="flex gap-4 animate-fade-in">
          <Link
            to={user ? "/dashboard" : "/signup"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Start Learning
          </Link>
          <Link
            to={user ? "/manage" : "/signup"}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Manage Cards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;