import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      toast.success('Account created');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded" />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded">Register</button>
      </form>
    </div>
  );
}
