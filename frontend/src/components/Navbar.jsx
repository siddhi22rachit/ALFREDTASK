import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Flashcard App</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded">Login / Signup</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
