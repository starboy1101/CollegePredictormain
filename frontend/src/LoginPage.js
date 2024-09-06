import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Track forgot password state
    const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '', mobile: '' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [forgotPasswordData, setForgotPasswordData] = useState({ email: '', otp: '', newPassword: '' }); // For Forgot Password
    const [signUpErrors, setSignUpErrors] = useState({});
    const [signInErrors, setSignInErrors] = useState({});
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState({});
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
        setIsForgotPassword(false);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        setIsForgotPassword(false);
    };

    const handleForgotPasswordClick = () => {
        setIsForgotPassword(true);
    };

    const handleForgotPasswordChange = (e) => {
        setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
    };

    const handleSignUpChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSignInChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    const validateForgotPassword = () => {
        const errors = {};
        if (!forgotPasswordData.email) errors.email = 'Email is required';
        if (!forgotPasswordData.otp) errors.otp = 'OTP is required';
        if (!forgotPasswordData.newPassword) errors.newPassword = 'New password is required';
        return errors;
    };

    const validateSignUp = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signUpData.username.trim()) errors.username = 'Username is required';
        if (!signUpData.email.trim()) errors.email = 'Email is required';
        else if (!emailRegex.test(signUpData.email)) errors.email = 'Invalid email format';
        else if (!signUpData.email.endsWith('.com')) errors.email = "Email must end with .com";
        if (!signUpData.password) errors.password = 'Password is required';
        else if (signUpData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (!signUpData.mobile) errors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(signUpData.mobile)) errors.mobile = 'Invalid mobile number. Must be 10 digits';

        return errors;
    };

    const validateSignIn = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!signInData.email) errors.email = 'Email is required';
        else if (!emailRegex.test(signInData.email)) errors.email = 'Invalid email format';
        else if (!signUpData.email.endsWith('.com')) errors.email = "Email must end with .com";
        if (!signInData.password) errors.password = 'Password is required';

        return errors;
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForgotPassword();
        if (Object.keys(errors).length > 0) {
            setForgotPasswordErrors(errors);
        } else {
            try {
                const response = await fetch('http://localhost:4000/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(forgotPasswordData),
                });
                const result = await response.json();
                if (result.success) {
                    alert('Password reset successful!');
                    navigate('/login');
                } else {
                    alert('OTP verification failed.');
                }
            } catch (error) {
                console.error('Error during OTP verification:', error);
            }
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const errors = validateSignUp();
        if (Object.keys(errors).length > 0) {
            setSignUpErrors(errors);
        } else {
            setSignUpErrors({});
            try {
                const response = await fetch('http://localhost:4000/addUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signUpData),
                });
                const result = await response.json();
                if (result.operation === 'success') {
                    alert('Sign Up Successful');
                } else {
                    alert('Sign Up Failed');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
            }
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const errors = validateSignIn();
        if (Object.keys(errors).length > 0) {
            setSignInErrors(errors);
        } else {
            setSignInErrors({});
            try {
                const response = await fetch('http://localhost:4000/login-by-post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signInData),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (response.status === 200) {
                        alert('Login Successful');
                        navigate('/');
                    } else {
                        alert('Login Failed');
                    }
                } else {
                    console.error('Login Error:', response.statusText);
                    alert('Login Failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };
  
    return (
        <div className="auth-page">
            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
                {!isForgotPassword ? (
                    <>
                        <div className="form-container sign-up-container">
                            <form onSubmit={handleSignUpSubmit}>
                                <h1>Create Account</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Name"
                                    value={signUpData.username}
                                    onChange={handleSignUpChange}
                                />
                                {signUpErrors.username && <span className="error">{signUpErrors.username}</span>}
    
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={signUpData.email}
                                    onChange={handleSignUpChange}
                                />
                                {signUpErrors.email && <span className="error">{signUpErrors.email}</span>}
    
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signUpData.password}
                                    onChange={handleSignUpChange}
                                />
                                {signUpErrors.password && <span className="error">{signUpErrors.password}</span>}
    
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={signUpData.mobile}
                                    onChange={handleSignUpChange}
                                />
                                {signUpErrors.mobile && <span className="error">{signUpErrors.mobile}</span>}
    
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>
    
                        <div className="form-container sign-in-container">
                            <form onSubmit={handleSignInSubmit}>
                                <h1>Sign In</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                </div>
                                <span>or use your account</span>
    
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={signInData.email}
                                    onChange={handleSignInChange}
                                />
                                {signInErrors.email && <span className="error">{signInErrors.email}</span>}
    
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signInData.password}
                                    onChange={handleSignInChange}
                                />
                                {signInErrors.password && <span className="error">{signInErrors.password}</span>}
    
                                <a href="#" onClick={handleForgotPasswordClick}>Forgot your password?</a>
                                <button type="submit">Sign In</button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="form-container forgot-password-container">
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <h1>Forgot Password</h1>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={forgotPasswordData.email}
                                onChange={handleForgotPasswordChange}
                            />
                            {forgotPasswordErrors.email && <span className="error">{forgotPasswordErrors.email}</span>}
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter OTP"
                                value={forgotPasswordData.otp}
                                onChange={handleForgotPasswordChange}
                            />
                            {forgotPasswordErrors.otp && <span className="error">{forgotPasswordErrors.otp}</span>}
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={forgotPasswordData.newPassword}
                                onChange={handleForgotPasswordChange}
                            />
                            {forgotPasswordErrors.newPassword && <span className="error">{forgotPasswordErrors.newPassword}</span>}
                            <button type="submit">Reset Password</button>
                        </form>
                    </div>
                )}
    
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}  
export default LoginForm;
