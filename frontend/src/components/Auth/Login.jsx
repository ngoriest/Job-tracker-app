import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (!form.email.trim()) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      setIsLoading(false);
      return;
    }

    if (!form.password.trim()) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password
        })
      });

      localStorage.setItem('token', res.access_token);
      setIsLoggedIn(true);
      toast.success('Login successful!', { autoClose: 2000 });
      setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes(':')) {
        const errorObj = {};
        err.message.split(', ').forEach((e) => {
          const [field, msg] = e.split(': ');
          errorObj[field] = msg;
        });
        setErrors(errorObj);
      } else {
        toast.error(err.message || 'Login failed. Please try again.', { autoClose: 3000 });
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-white/80">Track your job applications</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                      errors.password ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>
            </div>

            <div>
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
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-white/80 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}