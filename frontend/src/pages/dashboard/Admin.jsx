import { ProtectedRoute } from '../../components/common/ProtectedRoute';
import AdminDashboard from '../../components/dashboard/AdminDashboard';

const Admin = () => {
  return (
    <ProtectedRoute adminOnly>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar would be included here */}
        <div className="flex-1 p-8">
          <AdminDashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;