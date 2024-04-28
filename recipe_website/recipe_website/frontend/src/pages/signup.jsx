// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
            console.log('Signed up:', response.data);
            // Redirect or handle response
        } catch (error) {
            console.error('Signup error:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Sign Up</button>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
    );
}

export default SignUp;
