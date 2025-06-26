import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Replace with API call
    if (user) {
      const mockTasks = [
        {
          id: 1,
          description: 'Prepare for technical interview',
          due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          is_completed: false,
          user_id: user.id
        },
        {
          id: 2,
          description: 'Follow up with HR',
          due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          is_completed: true,
          user_id: user.id
        }
      ];
      setTasks(mockTasks);
      setLoading(false);
    }
  }, [user]);

  const addTask = (task) => {
    // TODO: Replace with API call
    const newTask = {
      ...task,
      id: Math.floor(Math.random() * 1000),
      user_id: user.id,
      is_completed: task.is_completed || false
    };
    setTasks([...tasks, newTask]);
    return Promise.resolve(newTask);
  };

  const updateTask = (id, updates) => {
    // TODO: Replace with API call
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
    return Promise.resolve();
  };

  const deleteTask = (id) => {
    // TODO: Replace with API call
    setTasks(tasks.filter(t => t.id !== id));
    return Promise.resolve();
  };

  const toggleTaskCompletion = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      return updateTask(id, { is_completed: !task.is_completed });
    }
    return Promise.reject('Task not found');
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        loading, 
        addTask, 
        updateTask, 
        deleteTask,
        toggleTaskCompletion
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);