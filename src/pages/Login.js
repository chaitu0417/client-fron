import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error display
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p class="center-text">Don't have an account? <a href="/register">Register</a></p>




</div>
  );
};

export default Login;
