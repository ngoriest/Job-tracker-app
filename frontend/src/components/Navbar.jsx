import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-indigo-200 transition-all duration-200"
        >
          JobTracker
        </Link>

        <div className="flex flex-wrap gap-6 items-center text-sm font-medium">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/applications"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Applications
              </Link>
              <Link
                to="/tasks"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Tasks
              </Link>
              <button
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg shadow-sm transition duration-200 backdrop-blur-sm border border-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}