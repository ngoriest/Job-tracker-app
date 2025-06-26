import { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useApplications } from '../../context/ApplicationContext';

const TaskForm = ({ task, onClose }) => {
  const { addTask, updateTask } = useTasks();
  const { applications } = useApplications();
  const [formData, setFormData] = useState({
    description: '',
    due_date: '',
    is_completed: false,
    application_id: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        description: task.description,
        due_date: task.due_date ? formatDateForInput(task.due_date) : '',
        is_completed: task.is_completed,
        application_id: task.application_id || ''
      });
    }
  }, [task]);

  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        ...formData,
        due_date: formData.due_date || null,
        application_id: formData.application_id || null
      };

      if (task) {
        await updateTask(task.id, taskData);
      } else {
        await addTask(taskData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {task ? 'Edit Task' : 'Add New Task'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="due_date">
                Due Date (optional)
              </label>
              <input
                id="due_date"
                name="due_date"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>
            {applications.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="application_id">
                  Related Application (optional)
                </label>
                <select
                  id="application_id"
                  name="application_id"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.application_id}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {applications.map(app => (
                    <option key={app.id} value={app.id}>
                      {app.job_title} at {app.company}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4 flex items-center">
              <input
                id="is_completed"
                name="is_completed"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={formData.is_completed}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="is_completed" className="ml-2 block text-sm text-gray-900">
                Completed
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {task ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;