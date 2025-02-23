// SignupPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 
                  focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 
                  focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 
                  focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg 
                transition-colors font-medium"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;