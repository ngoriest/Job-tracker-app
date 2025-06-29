import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { toast } from 'react-toastify';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    description: '',
    due_date: '',
    is_completed: false,
    application_id: '', // optional
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
    console.log("📤 Submitting Task Payload:", form);
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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Tasks</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded shadow space-y-4">
        <input name="description" value={form.description} onChange={handleChange} placeholder="Task description"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <input type="date" name="due_date" value={form.due_date} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <label className="flex items-center space-x-2 text-white">
          <input type="checkbox" name="is_completed" checked={form.is_completed} onChange={handleChange} />
          <span>Completed</span>
        </label>
        <button className="bg-teal-600 hover:bg-teal-700 w-full p-2 rounded text-white">
          {editingId ? 'Update' : 'Add'} Task
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-800 p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white">{task.description}</h3>
              {task.due_date && <p className="text-gray-400">Due: {task.due_date.slice(0, 10)}</p>}
              <p className="text-gray-400">Status: {task.is_completed ? '✅ Done' : '❌ Pending'}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(task)} className="text-blue-400">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
