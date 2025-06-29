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

    console.log("Sending payload:", payload);
    
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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Job Applications</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded shadow space-y-4">
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <input name="job_title" value={form.job_title} onChange={handleChange} placeholder="Job Title"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <select name="status" value={form.status} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input type="date" name="application_date" value={form.application_date} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <button className="bg-indigo-600 hover:bg-indigo-700 w-full p-2 rounded">
          {editingId ? 'Update' : 'Add'} Application
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-gray-800 p-4 rounded shadow flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{app.job_title} @ {app.company}</h3>
              <p>Status: <span className="text-yellow-400">{app.status}</span></p>
              {app.deadline && <p>Deadline: {app.deadline.slice(0, 10)}</p>}
              {app.notes && <p className="text-sm mt-1 text-gray-400">Notes: {app.notes}</p>}
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(app)} className="text-blue-400">Edit</button>
              <button onClick={() => handleDelete(app.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}