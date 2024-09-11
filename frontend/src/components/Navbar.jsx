import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets/home";
import Container from "./Container";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user details

  useEffect(() => {
    // Example function to check if user is logged in and fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user/details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogin = () => {
    // Logic for user login
    // After successful login, fetch user details
    fetchUserDetails();
  };

  const handleLogout = () => {
    // Logic for user logout
    localStorage.removeItem('token'); // Remove token
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="py-2 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4 items-center">
            <img className="h-[130px] w-[120px]" src={logo} alt="Workflow" />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/Home"
                  className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Spotround
                </Link>

                <Link
                  to="/admissions"
                  className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admissions
                </Link>

                {/* Dropdown for College Predictor */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    College Predictor
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <Link
                        to="/Collpred"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        CET Predictor
                      </Link>
                      <Link
                        to="/Neetpred"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        NEET Predictor
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {!isLoggedIn ? (
            <Link to="/login">
              <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                Log In / Sign up
              </div>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center hover:bg-button-primary px-4 py-2 rounded-xl"
              >
                <img
                  src="/path/to/profile-icon.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">User Profile</h2>
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    {/* Add more user details here */}
                    <button
                      onClick={handleLogout}
                      className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden transition-all" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              <Link
                to="/"
                className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/"
                className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Spotround
              </Link>
              <Link
                to="/admissions"
                className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Admissions
              </Link>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  College Predictor
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <Link
                      to="/Collpred"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      CET Predictor
                    </Link>
                    <Link
                      to="/Neetpred"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      NEET Predictor
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/about"
                className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact Us
              </Link>
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="hover:bg-primary-base bg-button-primary text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log In / Sign up
                </Link>
              ) : (
                <button
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="flex items-center hover:bg-primary-base hover:bg-button-primary text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <img
                    src="/path/to/profile-icon.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;

