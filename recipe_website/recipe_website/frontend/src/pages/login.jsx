import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setCookies] = useCookies(["token"])
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                username,
                password,
            });
            setCookies("token", response.data.token)
            console.log('Login successful:', response.data);
            // Here you might want to redirect the user or save the auth token
        } catch (error) {
            console.error('Login error:', error.response?.data?.msg || 'Login failed');
            setErrorMessage(error.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
