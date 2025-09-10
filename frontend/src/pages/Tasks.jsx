import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { toast } from 'react-toastify';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    description: '',
    due_date: '',
    is_completed: false,
    application_id: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [tasksData, appsData] = await Promise.all([
        apiFetch('/tasks'),
        apiFetch('/applications')
      ]);
      setTasks(tasksData);
      setApplications(appsData.applications || appsData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        due_date: form.due_date ? new Date(form.due_date).toISOString() : null
      };

      if (editingId) {
        await apiFetch(`/tasks/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        toast.success('Task updated');
      } else {
        await apiFetch('/tasks', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        toast.success('Task created');
      }

      setForm({ description: '', due_date: '', is_completed: false, application_id: '' });
      setEditingId(null);
      fetchData();
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
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getApplicationName = (id) => {
    const app = applications.find(a => a.id === id);
    return app ? `${app.company} - ${app.job_title}` : 'No linked application';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-white/20">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Your Tasks</h1>
            <div className="text-white/80">
              {tasks.filter(t => !t.is_completed).length} pending • {tasks.length} total
            </div>
          </div>
          <p className="text-white/80 mt-2">Manage your job search tasks and deadlines</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingId ? 'Edit Task' : 'Add New Task'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80">Description *</label>
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What needs to be done?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Linked Application</label>
                <select
                  name="application_id"
                  value={form.application_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  {applications.map(app => (
                    <option key={app.id} value={app.id}>
                      {app.company} - {app.job_title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_completed"
                checked={form.is_completed}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 bg-white/5 border-white/10 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-white/80">Completed</label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {editingId ? 'Update Task' : 'Add Task'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ description: '', due_date: '', is_completed: false, application_id: '' });
                }}
                className="w-full mt-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Tasks list */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center text-white/80 border border-white/20">
              No tasks yet. Add your first task!
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-5 border ${
                  task.application_id ? 'border-blue-500/30' : 'border-white/20'
                } hover:border-white/40 transition-all duration-300 ${task.is_completed ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => handleEdit({ ...task, is_completed: !task.is_completed })}
                    className="mt-1 h-5 w-5 text-blue-600 bg-white/5 border-white/10 rounded focus:ring-blue-500"
                  />
                  <div className="ml-4 flex-1">
                    <p className={`text-white ${task.is_completed ? 'line-through' : ''}`}>
                      {task.description}
                    </p>
                    {task.application_id && (
                      <p className="text-sm text-blue-400 mt-2">
                        Linked to: {getApplicationName(task.application_id)}
                      </p>
                    )}
                    {task.due_date && (
                      <p className={`text-sm mt-2 ${
                        new Date(task.due_date) < new Date() && !task.is_completed
                          ? 'text-red-400'
                          : 'text-white/70'
                      }`}>
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 ml-4">
                    <button 
                      onClick={() => handleEdit(task)} 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(task.id)} 
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}