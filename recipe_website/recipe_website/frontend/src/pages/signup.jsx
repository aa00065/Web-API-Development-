import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
            console.log('Signed up:', response.data);
            navigate('/login');
            // Redirect or handle response
        } catch (error) {
            console.error('Signup error:', error.response.data);
        }
    };

    return (
        <SignUpContainer>
            <Title>Sign Up</Title>
            <SignUpForm onSubmit={handleSubmit}>
                <Label>Username:</Label>
                <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
                <Label>Password:</Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <Button type="submit">Sign Up</Button>
            </SignUpForm>
            <LoginPrompt>Already have an account? <StyledLink to="/login">Login here</StyledLink></LoginPrompt>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.div`
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

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #1e1e1e;
`;

const Label = styled.label`
  color: #FFF;
  margin-bottom: 5px;
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

const LoginPrompt = styled.p`
  margin-top: 10px;
  color: #ddd;
`;

const StyledLink = styled(Link)`
  color: #80deea;
  &:hover {
    text-decoration: underline;
  }
`;

export default SignUp;
