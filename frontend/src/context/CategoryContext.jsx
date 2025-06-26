import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Replace with API call
    if (user) {
      const mockCategories = [
        { id: 1, name: 'Software Development', user_id: user.id },
        { id: 2, name: 'Data Science', user_id: user.id }
      ];
      setCategories(mockCategories);
      setLoading(false);
    }
  }, [user]);

  const addCategory = (category) => {
    // TODO: Replace with API call
    const newCategory = {
      ...category,
      id: Math.floor(Math.random() * 1000),
      user_id: user.id
    };
    setCategories([...categories, newCategory]);
    return Promise.resolve(newCategory);
  };

  const updateCategory = (id, updates) => {
    // TODO: Replace with API call
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
    return Promise.resolve();
  };

  const deleteCategory = (id) => {
    // TODO: Replace with API call
    setCategories(categories.filter(cat => cat.id !== id));
    return Promise.resolve();
  };

  return (
    <CategoryContext.Provider 
      value={{ 
        categories, 
        loading, 
        addCategory, 
        updateCategory, 
        deleteCategory 
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);