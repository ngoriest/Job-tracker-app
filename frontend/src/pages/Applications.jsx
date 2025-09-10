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
      ...form,
      company: form.company.trim(),
      job_title: form.job_title.trim(),
      notes: form.notes.trim(),
      application_date: form.application_date
        ? new Date(form.application_date).toISOString()
        : new Date().toISOString(),
      deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-white/20">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Job Applications</h1>
            <div className="text-white/80">
              {applications.length} {applications.length === 1 ? 'application' : 'applications'}
            </div>
          </div>
          <p className="text-white/80 mt-2">Track all your job applications in one place</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">{editingId ? 'Edit Application' : 'Add New Application'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['company', 'job_title'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-white/80 capitalize">{field} *</label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-white/80">Status</label>
                <select 
                  name="status" 
                  value={form.status} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80">Application Date</label>
                  <input
                    type="date"
                    name="application_date"
                    value={form.application_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80">Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
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
                  className="w-full mt-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center text-white/80 border border-white/20">
                No applications yet. Add your first job application!
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{app.job_title}</h3>
                      <p className="text-white/80">{app.company}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">{app.status}</span>
                        {app.deadline && (
                          <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full">
                            ⏰ {new Date(app.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {app.notes && <p className="mt-3 text-white/80">{app.notes}</p>}
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleEdit(app)} 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(app.id)} 
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
    </div>
  );
}