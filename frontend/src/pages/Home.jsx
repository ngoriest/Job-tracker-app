import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 relative overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDE4djE4SDM2VjM0em0wLTM2aDE4djE4SDM2VjM0ek0wIDM0aDE4djE4SDBWMzR6TTAgMGgxOHYxOEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      {/* Animated circles for background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-bounce delay-1000"></div>
      
      <div className="max-w-4xl mx-auto p-6 text-center relative z-10 pt-16">
        {/* Main content card with glass effect */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Job Application Tracker
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Organize your job search, track applications, and manage tasks all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Feature cards with glass effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-white mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Track Applications</h3>
            <p className="text-white/80">
              Keep all your job applications organized in one place with status tracking.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-white mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Manage Tasks</h3>
            <p className="text-white/80">
              Stay on top of your job search with task management and deadlines.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-white mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Analyze Progress</h3>
            <p className="text-white/80">
              Visualize your job search progress and identify areas for improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}