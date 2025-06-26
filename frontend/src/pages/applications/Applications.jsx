import { ProtectedRoute } from '../../components/common/ProtectedRoute';
import ApplicationList from '../../components/applications/ApplicationList';

const Applications = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar would be included here */}
        <div className="flex-1 p-8">
          <ApplicationList />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Applications;