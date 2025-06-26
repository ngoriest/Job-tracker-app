import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="text-center"
        >
          <motion.h1 
            variants={item}
            className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600 sm:text-6xl lg:text-7xl mb-2"
          >
            Welcome to JobTracker
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-300"
          >
            {user ? (
              <>
                <span className="text-indigo-400 font-medium">Hello, {user.username}!</span> Ready to supercharge your job search?
              </>
            ) : (
              'Your all-in-one platform for managing job applications, interviews, and career growth'
            )}
          </motion.p>

          <motion.div 
            variants={item}
            className="mt-12 flex justify-center"
          >
            {user ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { to: '/applications', text: 'Applications', icon: '📋' },
                  { to: '/tasks', text: 'Tasks', icon: '✅' },
                  { to: '/categories', text: 'Categories', icon: '🗂' }
                ].map((link, index) => (
                  <motion.div
                    key={link.to}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to={link.to}
                      className={`px-8 py-5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 flex flex-col items-center transition-all duration-300 ${isHovered === index ? 'shadow-lg shadow-indigo-500/20' : ''}`}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <span className="text-3xl mb-3">{link.icon}</span>
                      <span className="text-lg font-medium">{link.text}</span>
                      <span className="mt-2 text-sm text-indigo-400">Explore →</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Link
                    to="/login"
                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                  >
                    Sign in
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="px-8 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white font-medium hover:bg-gray-700 transition-all"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>

          {!user && (
            <motion.div 
              variants={item}
              className="mt-16 bg-gray-800/50 p-6 rounded-xl border border-gray-700 max-w-3xl mx-auto"
            >
              <h3 className="text-xl font-semibold mb-3 text-indigo-400">Why JobTracker?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: 'Fast', desc: 'Lightning quick interface' },
                  { icon: '🔒', title: 'Secure', desc: 'Your data is protected' },
                  { icon: '📈', title: 'Effective', desc: 'Proven results' }
                ].map((feature) => (
                  <div key={feature.title} className="p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;