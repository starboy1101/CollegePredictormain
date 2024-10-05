import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/home";
import Container from "./Container";
import SidePanel from "./SidePanel.jsx";
import { useAuth } from '../context/AuthContext'; // Import AuthContext

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();

  // Toggle the side panel
  const toggleSidePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  // Handle user login and set user state
  const handleLogin = (userData) => {
    setUser(userData); // Update user context
    setIsPanelOpen(false); // Close the side panel after login
    navigate('/'); // Redirect to home or any other page after successful login
  };

  const handleLogout = () => {
    setUser(null); // Clear user context
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Optionally redirect to home after logout
  };

  const handlePredictorClick = (event, route) => {
    if (!user) {
      event.preventDefault(); 
      setIsPanelOpen(true); 
    } else {
      navigate(route); 
    }
    setDropdownOpen(false); 
  };


  return (
    <nav className="py-2 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4 items-center">
            <img className="h-[130px] w-[120px]" src={logo} alt="Workflow" />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/Home" className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/" className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Spotround
                </Link>
                <Link to="/admissions" className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Admissions
                </Link>
                {/* Dropdown for College Predictor */}
                <div className="relative">
                  <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    College Predictor
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <Link to="/Collpred" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => handlePredictorClick(e, '/Collpred')}>
                        CET Predictor
                      </Link>
                      <Link to="/Neetpred" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => handlePredictorClick(e, '/Neetpred')}>
                        NEET Predictor
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/about" className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About Us
                </Link>
                <Link to="/contact" className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Contact Us
                </Link>
                <div className="relative">
            <button
              onClick={toggleSidePanel} // Handle login or profile navigation
              className="flex items-center hover:bg-button-primary px-4 py-2 rounded-xl"
            >
              <span className="text-sm font-medium">{user ? "Profile" : "Log In / Sign Up"}</span>
            </button>
          </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Side Panel for login/signup or profile */}
        <SidePanel  
          isOpen={isPanelOpen} // Open/close state of the side panel
          onClose={toggleSidePanel} // Function to close the panel
          isLoggedIn={!!user} // Pass whether user is logged in
          user={user} // Pass user data
          onLogin={handleLogin} // Function to handle login
          onLogout={handleLogout} // Function to handle logout
        />

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden transition-all" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              <Link to="/" className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link to="/" className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Spotround
              </Link>
              <Link to="/admissions" className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Admissions
              </Link>
              <div className="relative">
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  College Predictor
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <Link to="/Collpred" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => handlePredictorClick(e, '/Collpred')}>
                      CET Predictor
                    </Link>
                    <Link to="/Neetpred" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => handlePredictorClick(e, '/Neetpred')}>
                      NEET Predictor
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/about" className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                About Us
              </Link>
              <Link to="/contact" className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Contact Us
              </Link>
              {/* Add login/signup button in mobile menu */}
              <button onClick={toggleSidePanel} className="flex items-center hover:bg-button-primary px-4 py-2 rounded-xl">
                <span className="text-sm font-medium">{user ? "Profile" : "Log In / Sign Up"}</span>
              </button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
export default Navbar;
