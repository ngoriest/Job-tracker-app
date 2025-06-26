import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/applications" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Manage Applications</h2>
          <p className="text-gray-600">View and manage all job applications</p>
        </Link>
        <Link to="/categories" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Manage Categories</h2>
          <p className="text-gray-600">Organize applications by categories</p>
        </Link>
        <Link to="/tasks" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Manage Tasks</h2>
          <p className="text-gray-600">Track all tasks and deadlines</p>
        </Link>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-gray-600">Manage all registered users</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;