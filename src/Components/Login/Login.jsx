import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

export default function Login() {
  const [form, setForm] = useState({
    phone: '',
    password: '',
    forgotPhone: ''
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        // Redirect or handle successful login
        navigate('/dashboard'); // Redirect to dashboard or another route
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: form.forgotPhone })
      });

      if (response.ok) {
        console.log('Password reset link sent to your phone');
      } else {
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page or another route
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {isLoggedIn ? (
          <div className="logged-in">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Welcome Back!</h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="forgotPhone" className="block text-lg font-medium text-gray-700 mb-2">Enter your phone number:</label>
                  <input
                    id="forgotPhone"
                    name="forgotPhone"
                    type="text"
                    value={form.forgotPhone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="block mt-4 text-blue-500 hover:underline"
                >
                  Back to Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Phone:</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password:</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  Sign In
                </button>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign In with Facebook
                  </button>
                  <button
                    type="button"
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Sign In with Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="block mt-4 text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <p className="mt-4 text-gray-600">You already have an account</p>
              </form>
            )}
          </>
        )}
      </section>
    </div>
  );
}
