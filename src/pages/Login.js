import React, { useState } from 'react';
import styled from 'styled-components';
import AuthService from '../services/AuthService.tsx';
import { colors } from '../theme';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${colors.coolGray};
  width: 350px;
`;
const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 1.5rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${colors.coolGray};
  border-radius: 4px;
`;
const Button = styled.button`
  width: 100%;
  background: ${colors.primary};
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover { background: ${colors.steel}; }
`;
const Link = styled.a`
  color: ${colors.teal};
  cursor: pointer;
  text-decoration: underline;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await AuthService.loginUser({ email, password });
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        {error && <div style={{ color: colors.orange, marginBottom: '1rem' }}>{error}</div>}
        <div>Don't have an account? <Link onClick={() => navigate('/register')}>Register</Link></div>
      </Form>
    </Container>
  );
}
