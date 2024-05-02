import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [, setCookies] = useCookies(['token']);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            setLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                username,
                password,
            });
            setCookies('token', response.data.token);
            console.log('Login successful:', response.data);
            sessionStorage.setItem('username', username); // Store username in sessionStorage
            setLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response?.data?.msg || 'Login failed');
            setErrorMessage(error.response?.data?.msg || 'Login failed');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setCookies('token', '', { expires: new Date(0) }); // Clear token cookie
        sessionStorage.removeItem('username'); // Remove username from sessionStorage
        navigate('/login');
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <LoginContainer>
            <Title>Login</Title>
            {loggedIn ? (
                <>
                    <UserInfo>Welcome, {username}!</UserInfo>
                    <Button onClick={handleLogout}>Logout</Button>
                </>
            ) : (
                <LoginForm onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        required
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <Button type="submit">Login</Button>
                </LoginForm>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <SignupPrompt>
                Don't have an account? <SignupLink href="/signup">Signup here</SignupLink>
            </SignupPrompt>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212; // Dark background
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #FFFFFF;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #1e1e1e;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #333;
  border-radius: 3px;
  background-color: #333;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #e57373;
  margin-top: 10px;
  text-align: center;
`;

const SignupPrompt = styled.p`
  margin-top: 20px;
  color: #ddd;
`;

const SignupLink = styled.a`
  color: #80deea;
`;

const UserInfo = styled.p`
  margin-bottom: 10px;
  color: #ddd;
`;

export default Login;
