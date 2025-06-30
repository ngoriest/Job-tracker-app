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
        <h2 className="text-3xl font-bold text-gray-900">Your Tasks</h2>
        <div className="text-sm text-gray-600">
          {tasks.filter(t => !t.is_completed).length} pending • {tasks.length} total
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Task' : 'Add New Task'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
              placeholder="What needs to be done?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                name="is_completed"
                checked={form.is_completed}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Completed</label>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">
            {editingId ? 'Update Task' : 'Add Task'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ description: '', due_date: '', is_completed: false, application_id: '' });
              }}
              className="w-full mt-2 text-sm text-gray-700 hover:underline"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Tasks list */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="p-6 text-center bg-gray-100 rounded-lg text-gray-600">
            No tasks yet. Add your first task!
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`bg-white rounded-lg shadow p-4 ${task.is_completed ? 'opacity-80' : ''}`}>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => handleEdit({ ...task, is_completed: !task.is_completed })}
                  className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <div className="ml-3 flex-1">
                  <p className={`text-gray-900 ${task.is_completed ? 'line-through' : ''}`}>{task.description}</p>
                  {task.due_date && (
                    <p className={`text-sm mt-1 ${
                      new Date(task.due_date) < new Date() && !task.is_completed
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`}>
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-2">
                  <button onClick={() => handleEdit(task)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
