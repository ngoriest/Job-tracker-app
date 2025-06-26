import { ProtectedRoute } from '../../components/common/ProtectedRoute';
import CategoryList from '../../components/categories/CategoryList';

const Categories = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar would be included here */}
        <div className="flex-1 p-8">
          <CategoryList />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Categories;