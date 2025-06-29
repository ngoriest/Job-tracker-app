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
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-400 hover:text-indigo-300 transition-all duration-200"
        >
          JobTracker
        </Link>

        <div className="flex flex-wrap gap-6 items-center text-sm font-medium">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/applications"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Applications
              </Link>
              <Link
                to="/tasks"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Tasks
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-indigo-400 transition-colors duration-200"
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
