import React from 'react';
import './SidePanel.css'; // Ensure you have a corresponding CSS file
import LoginModal from './LoginModal'; // Import the LoginModal component
import { useAuth } from '../context/AuthContext'; // Assuming you're using AuthContext

function SidePanel({ isOpen, onClose }) {
  const { user, logout } = useAuth(); // Use AuthContext

  const handleLogin = (user) => {
    // Set user data in local storage and close the side panel
    onClose(); // Close the side panel after successful login
  };

  const handleLogout = () => {
    logout(); // Clear user data from AuthContext and local storage
    onClose(); // Close the side panel
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} bg-gray-100 w-80 sm:w-1/3 md:w-1/4 lg:w-1/5`}
      aria-hidden={!isOpen} // Accessibility
    >
      <div className="flex justify-between p-4 border-b">
        <h2 className="text-xl font-bold">{user ? "Profile" : "Login / Signup"}</h2>
        <button onClick={onClose} className="text-lg">X</button>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-60px)]"> {/* Set max height and enable scrolling */}
        {user ? (
          <div className="p-4">
            <h3 className="text-lg">Welcome, {user.name}!</h3>
            <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="p-4 LoginModal"> {/* Add the responsive class here */}
            <LoginModal onLogin={handleLogin} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SidePanel;
