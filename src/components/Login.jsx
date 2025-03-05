import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Read expected values from environment variables (Vite requires VITE_ prefix)
  const expectedUsername = import.meta.env.VITE_USERNAME;
  const expectedPassword = import.meta.env.VITE_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === expectedUsername && password === expectedPassword) {
      setIsAuthenticated(true);
      navigate('/', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded shadow space-y-4">
      <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
      {error && (
        <div className="bg-red-600 p-2 rounded text-center text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm" htmlFor="username">
            <FaUser className="inline-block mr-1" />
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm" htmlFor="password">
            <FaLock className="inline-block mr-1" />
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 bg-blue-600 rounded hover:bg-blue-500 transition-colors duration-200"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
