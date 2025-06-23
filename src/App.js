// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Hero from './components/Hero'; // Homepage
import Categories from './components/Categories';
import Subscribe from './components/Subscribe';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Hero />} />

        {/* ✅ Protected route for categories */}
        <Route
          path="/categories"
          element={
            user ? <Categories user={user} /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route
          path="/admin-dashboard"
          element={
            user?.role === 'admin' ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
