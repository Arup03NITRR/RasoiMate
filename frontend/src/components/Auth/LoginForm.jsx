import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/auth/login', {
        email: form.email,
        password: form.password,
      });

      // --- THE CORRECTION IS HERE ---
      // Change 'res.data.username' to 'res.data.userName' to match your backend's key
      const userNameFromBackend = res.data.userName; // Corrected: capital 'N'

      // Pass the username as the third argument to the login function
      login(form.email, res.data.access_token, userNameFromBackend);

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Login
        </button>

        <div className="mt-4 flex justify-between text-sm text-purple-700">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;