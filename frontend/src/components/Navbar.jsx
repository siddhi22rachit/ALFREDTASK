import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Flashcard App
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
                <Link to="/manage" className="hover:text-blue-400 transition-colors">Manage Cards</Link>
                <span className="text-gray-400">|</span>
                <span className="text-gray-300">{user.name}</span>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded transition-colors">
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;