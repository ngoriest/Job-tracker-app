import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center animate-fade-in">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Job Application Tracker
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Organize your job search, track applications, and manage tasks all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white dark:bg-dark-700 border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-600 px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-primary-600 dark:text-primary-400 mb-4">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Track Applications</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Keep all your job applications organized in one place with status tracking.
          </p>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-primary-600 dark:text-primary-400 mb-4">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Manage Tasks</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Stay on top of your job search with task management and deadlines.
          </p>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-primary-600 dark:text-primary-400 mb-4">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Analyze Progress</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize your job search progress and identify areas for improvement.
          </p>
        </div>
      </div>
    </div>
  );
}