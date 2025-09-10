import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      toast.success('Account created successfully!', { autoClose: 2000 });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.message.includes(':')) {
        const errorObj = {};
        err.message.split(', ').forEach((e) => {
          const [field, msg] = e.split(': ');
          errorObj[field] = msg;
        });
        setErrors(errorObj);
      } else {
        toast.error(err.message || 'Registration failed', { autoClose: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Create an account
            </h2>
            <p className="mt-2 text-white/80">Start tracking your job applications</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {['username', 'email', 'password'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-white/80 capitalize mb-1">
                  {field} *
                </label>
                <input
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                    errors[field] ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder={
                    field === 'email' ? 'your@email.com' : 
                    field === 'password' ? '••••••••' : 'Your username'
                  }
                />
                {errors[field] && <p className="mt-1 text-sm text-red-400">{errors[field]}</p>}
              </div>
            ))}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : 'Register'}
            </button>
          </form>
          
          <div className="text-center text-sm text-white/80 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}