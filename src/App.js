import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Replace with your Dashboard component
import Bookings from './pages/Bookings';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
