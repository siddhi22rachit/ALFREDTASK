import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6">Welcome to Flashcard App</h1>
        <div className="flex gap-4">
          <Link to={user ? "/dashboard" : "/signup"} className="bg-green-500 text-white px-6 py-3 rounded-lg">Start Learning</Link>
          <Link to={user ? "/manage" : "/signup"} className="bg-blue-500 text-white px-6 py-3 rounded-lg">Manage Cards</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
