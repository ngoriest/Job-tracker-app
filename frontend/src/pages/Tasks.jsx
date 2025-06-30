import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { toast } from 'react-toastify';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    description: '',
    due_date: '',
    is_completed: false,
    application_id: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await apiFetch('/tasks');
      setTasks(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiFetch(`/tasks/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        });
        toast.success('Task updated');
      } else {
        await apiFetch('/tasks', {
          method: 'POST',
          body: JSON.stringify(form),
        });
        toast.success('Task created');
      }

      setForm({ description: '', due_date: '', is_completed: false, application_id: '' });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (task) => {
    setForm({
      description: task.description,
      due_date: task.due_date?.slice(0, 10) || '',
      is_completed: task.is_completed,
      application_id: task.application_id || '',
    });
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/tasks/${id}`, { method: 'DELETE' });
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your Tasks</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {tasks.filter(t => !t.is_completed).length} pending • {tasks.length} total
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Task' : 'Add New Task'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="What needs to be done?"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_completed"
                checked={form.is_completed}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Completed
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full">
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  description: '',
                  due_date: '',
                  is_completed: false,
                  application_id: '',
                });
              }}
              className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`card p-4 ${task.is_completed ? 'opacity-80' : ''}`}>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => handleEdit({ ...task, is_completed: !task.is_completed })}
                  className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                
                <div className="ml-3 flex-1">
                  <p className={`text-gray-800 dark:text-gray-200 ${task.is_completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                  
                  {task.due_date && (
                    <p className={`text-sm mt-1 ${
                      new Date(task.due_date) < new Date() && !task.is_completed
                        ? 'text-red-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <span className="status-dot bg-current"></span>
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 ml-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-full"
                    aria-label="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full"
                    aria-label="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}