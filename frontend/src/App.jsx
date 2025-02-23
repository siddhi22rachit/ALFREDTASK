import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import ManageCard from "./pages/ManageFlashcards";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ReviewFlashcards from "./pages/Review";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/review" element={<ReviewFlashcards />} />
            <Route path="/manage" element={<ManageCard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
