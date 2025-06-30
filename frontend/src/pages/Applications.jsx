import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { toast } from 'react-toastify';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    company: '',
    job_title: '',
    status: 'Applied',
    application_date: '',
    deadline: '',
    notes: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchApplications = async () => {
    try {
      const res = await apiFetch('/applications');
      setApplications(res.applications);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company: form.company.trim(),
      job_title: form.job_title.trim(),
      status: form.status,
      notes: form.notes.trim(),
      application_date: form.application_date
        ? new Date(form.application_date).toISOString()
        : new Date().toISOString(),
      deadline: form.deadline
        ? new Date(form.deadline).toISOString()
        : null,
    };
    
    try {
      if (editingId) {
        await apiFetch(`/applications/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        toast.success('Application updated');
      } else {
        await apiFetch('/applications', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        toast.success('Application created');
      }

      setForm({
        company: '',
        job_title: '',
        status: 'Applied',
        application_date: '',
        deadline: '',
        notes: '',
      });
      setEditingId(null);
      fetchApplications();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (app) => {
    setForm({
      company: app.company,
      job_title: app.job_title,
      status: app.status,
      application_date: app.application_date?.slice(0, 10) || '',
      deadline: app.deadline?.slice(0, 10) || '',
      notes: app.notes,
    });
    setEditingId(app.id);
  };

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/applications/${id}`, { method: 'DELETE' });
      toast.success('Application deleted');
      fetchApplications();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Job Applications</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {applications.length} {applications.length === 1 ? 'application' : 'applications'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1 card p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Application' : 'Add New Application'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company *</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Job Title *</label>
              <input
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Application Date</label>
                <input
                  type="date"
                  name="application_date"
                  value={form.application_date}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="input-field"
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              {editingId ? 'Update Application' : 'Add Application'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    company: '',
                    job_title: '',
                    status: 'Applied',
                    application_date: '',
                    deadline: '',
                    notes: '',
                  });
                }}
                className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Applications List */}
        <div className="lg:col-span-2 space-y-4">
          {applications.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-gray-500">No applications yet. Add your first job application!</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{app.job_title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{app.company}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`status-badge ${
                        app.status === 'Applied' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        app.status === 'Interview' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                        app.status === 'Offer' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {app.status}
                      </span>
                      
                      {app.deadline && (
                        <span className="status-badge bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          ⏰ {new Date(app.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    {app.notes && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{app.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(app)}
                      className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-full"
                      aria-label="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full"
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
    </div>
  );
}