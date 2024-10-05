import React, { useState } from 'react';
import Front from "../components/Home/Front1";
import Funds from "../components/Home/Funds2";
import HowItWorks from "../components/Home/HowItWorks2";
import News from "../components/Home/News2";
import Stats from "../components/Home/Stats1";
import Footer from "../components/Footer";
import SidePanel from '../components/SidePanel'; // Import the SidePanel component
import { useAuth } from '../context/AuthContext'; // Import AuthContext

export default function Collpred() {
  const { user } = useAuth(); // Access user from AuthContext
  const [showFunds, setShowFunds] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false); // State to control SidePanel

  const handleSearch = () => {
    if (user) { // Check if user is logged in
      setShowFunds(true); 
    } else {
      setIsSidePanelOpen(true); // Open SidePanel for login if not logged in
    }
  };

  const handleLoginClose = () => {
    setIsSidePanelOpen(false); // Close SidePanel after successful login
  };

  return (
    <main>
      <Front />
      <Stats onSearch={handleSearch} />
      {showFunds && <Funds />} 
      <News />
      <HowItWorks />
      <Footer />

      <SidePanel 
        isOpen={isSidePanelOpen} 
        onClose={handleLoginClose} 
        isLoggedIn={!!user} // Determine logged-in status
        onLogin={(userData) => { // Handle login
          setShowFunds(true); // Show funds after login
          handleLoginClose(); // Close side panel after login
        }} 
      />
    </main>
  );
}
