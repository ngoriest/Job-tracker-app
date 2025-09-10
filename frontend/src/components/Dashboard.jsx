export default function Dashboard() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center mb-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white">Welcome to your Dashboard</h1>
          <p className="text-white/80 mt-2">Track all your job applications and tasks here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white">12</h3>
            <p className="text-white/80">Applications</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white">5</h3>
            <p className="text-white/80">Interviews</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white">3</h3>
            <p className="text-white/80">Pending Tasks</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-200">
              Add New Application
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors duration-200">
              Create New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}