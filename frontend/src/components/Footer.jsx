import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ isLoggedIn }) {
  return (
    <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">JobTracker</h3>
            <p className="text-white/80">
              The ultimate tool to organize your job search and track applications.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/applications" className="text-white/80 hover:text-white transition-colors">Applications</Link></li>
                  <li><Link to="/tasks" className="text-white/80 hover:text-white transition-colors">Tasks</Link></li>
                </>
              ) : (
                <li><Link to="/features" className="text-white/80 hover:text-white transition-colors">Features</Link></li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {isLoggedIn ? 'Your Account' : 'Get Started'}
            </h4>
            <div className="flex flex-col space-y-3">
              {isLoggedIn ? (
                <Link 
                  to="/dashboard" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all shadow-md text-center"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all shadow-md text-center"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} JobTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}