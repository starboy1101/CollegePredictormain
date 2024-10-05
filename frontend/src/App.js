import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SidePanel from './components/SidePanel';
import Home from './Pages/Home';
import Admportal from './Pages/admportal';
import Collpred from './Pages/Collpred';
import Neetpred from './Pages/Neetpred';
import AdminDashboard from './Admindashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Correctly import the ProtectedRoute

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsOpen(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setIsOpen(true)} 
        user={user}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/admportal" element={<Admportal />} />
        <Route 
          path="/collpred" 
          element={
            <ProtectedRoute>
              <Collpred />
            </ProtectedRoute>
          } 
        />
        <Route path="/neetpred" element={<Neetpred />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <SidePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
      />
    </>
  );
}

export default App;
