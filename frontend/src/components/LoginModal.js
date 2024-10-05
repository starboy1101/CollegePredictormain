import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';
import { useAuth } from '../context/AuthContext';

const LoginTypeSelector = ({ type, handleLoginTypeChange }) => (
  <div className="login-type">
    <label>
      <input
        type="radio"
        value="student"
        checked={type === 'student'}
        onChange={handleLoginTypeChange}
      />
      Student
    </label>
    <label>
      <input
        type="radio"
        value="admin"
        checked={type === 'admin'}
        onChange={handleLoginTypeChange}
      />
      Admin
    </label>
  </div>
);

const LoginForm = ({
  isRegistering,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  course,
  setCourse,
  percentile,
  setPercentile,
  handleFormSubmit,
  isLoading,
}) => (
  <form className="login-form" onSubmit={handleFormSubmit}>
    {isRegistering && (
      <>
        <input
          required
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          required
          type="number"
          placeholder="Percentile"
          value={percentile}
          onChange={(e) => setPercentile(e.target.value)}
        />
      </>
    )}
    <input
      required
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      required
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit" disabled={isLoading}>
      {isRegistering ? 'Register' : 'Login'}
    </button>
    {isLoading && <p>Loading...</p>}
  </form>
);

const LoginModal = ({ onLogin }) => {
  const [type, setType] = useState('student');
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [percentile, setPercentile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const { setUser } = useAuth(); // Assuming you have a setUser function to update user context

  const handleLoginTypeChange = (e) => setType(e.target.value);

  const loginUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message }; // Return structured response
      }

      return await response.json();
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'An error occurred during login.' }; // Return structured response
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isRegistering) {
      if (!email.includes('@')) {
        alert('Please enter a valid email.');
        setIsLoading(false);
        return;
      }
      if (percentile < 0 || percentile > 100) {
        alert('Percentile must be between 0 and 100.');
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isRegistering) {
        // Registration logic
        const formData = { name, email, password, type, course, percentile: parseInt(percentile, 10) };
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (data.success) {
          alert('Registered successfully!');
          setUser(data.user); // Set user in context
          onLogin(data.user); // Triggering onLogin after registration
          navigate('/'); // Redirect to home after success
        } else {
          alert('Registration failed: ' + data.message);
        }
      } else {
        // Login logic
        const logindata = await loginUser({ email, password, type });

        if (logindata.success) {
          localStorage.setItem('token', logindata.token);
          setUser(logindata.user);  // Set user in context
          onLogin(logindata.user); // Triggering onLogin after login

          if (logindata.user.type === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        } else {
          alert('Login failed! Invalid credentials.');
        }
      }
    } catch (error) {
      console.error('Error during login or registration:', error);
      alert('An error occurred during the process. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-modal">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <LoginTypeSelector type={type} handleLoginTypeChange={handleLoginTypeChange} />
      <LoginForm
        isRegistering={isRegistering}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        course={course}
        setCourse={setCourse}
        percentile={percentile}
        setPercentile={setPercentile}
        handleFormSubmit={handleFormSubmit}
        isLoading={isLoading}
      />
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setIsRegistering(!isRegistering);
          setEmail('');
          setPassword('');
          setName('');
          setCourse('');
          setPercentile('');
        }}
        style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
      >
        {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
      </a>
    </div>
  );
};

export default LoginModal;
