import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadTester from './components/LoadTester';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Check localStorage for a saved "isAuthenticated" flag on first render.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // When authentication state changes, update localStorage.
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (

      <div className="min-h-screen bg-gray-900 text-green-300 font-mono p-4 sm:p-6 md:p-8">
        <Routes>
          {/* <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          /> */}
          <Route
            path="/*"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <LoadTester />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

  );
}

export default App;
