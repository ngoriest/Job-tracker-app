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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Job Applications</h2>
        <div className="text-sm text-gray-600">
          {applications.length} {applications.length === 1 ? 'application' : 'applications'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Application' : 'Add New Application'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['company', 'job_title'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{field} *</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-gray-300 text-gray-900"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border rounded border-gray-300">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Application Date</label>
                <input
                  type="date"
                  name="application_date"
                  value={form.application_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-300"
              />
            </div>

            <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">
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
                className="w-full mt-2 text-sm text-gray-700 hover:underline"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {applications.length === 0 ? (
            <div className="p-6 bg-gray-100 rounded-lg text-center text-gray-600">
              No applications yet. Add your first job application!
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{app.job_title}</h3>
                    <p className="text-gray-600">{app.company}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{app.status}</span>
                      {app.deadline && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          ⏰ {new Date(app.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {app.notes && <p className="mt-3 text-gray-600">{app.notes}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(app)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:underline">Delete</button>
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
