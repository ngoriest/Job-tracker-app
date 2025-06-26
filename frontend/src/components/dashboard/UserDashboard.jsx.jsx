import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/applications" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">My Applications</h2>
          <p className="text-gray-600">View and manage your job applications</p>
        </Link>
        <Link to="/categories" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">My Categories</h2>
          <p className="text-gray-600">Organize your applications</p>
        </Link>
        <Link to="/tasks" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">My Tasks</h2>
          <p className="text-gray-600">Track your tasks and deadlines</p>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;