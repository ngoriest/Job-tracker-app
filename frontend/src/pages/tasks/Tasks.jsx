import { ProtectedRoute } from '../../components/common/ProtectedRoute';
import TaskList from '../../components/tasks/TaskList';

const Tasks = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar would be included here */}
        <div className="flex-1 p-8">
          <TaskList />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Tasks;