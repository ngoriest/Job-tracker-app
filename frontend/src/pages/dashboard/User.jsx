import { ProtectedRoute } from '../../components/common/ProtectedRoute';
import UserDashboard from "../../components/dashboard/UserDashboard.jsx";
const User = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar would be included here */}
        <div className="flex-1 p-8">
          <UserDashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default User;