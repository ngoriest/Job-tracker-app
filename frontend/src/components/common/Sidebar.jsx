import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-indigo-700">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-white text-xl font-bold">JobTracker</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <Link
              to="/"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/') ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'}`}
            >
              Dashboard
            </Link>
            <Link
              to="/applications"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/applications') ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'}`}
            >
              Applications
            </Link>
            <Link
              to="/categories"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/categories') ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'}`}
            >
              Categories
            </Link>
            <Link
              to="/tasks"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/tasks') ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'}`}
            >
              Tasks
            </Link>
            {user?.is_admin && (
              <Link
                to="/admin"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/admin') ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'}`}
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-indigo-600 p-4">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs font-medium text-indigo-200">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;