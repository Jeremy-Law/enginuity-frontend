import React, { useState } from 'react';
import styled from 'styled-components';
// import { registerUser } from '../services/api';
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

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Engineer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  setError('Registration is not available.');
  setLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 4, border: `1px solid ${colors.coolGray}` }}>
          <option value="Engineer">Engineer</option>
          <option value="Admin">Admin</option>
          <option value="Viewer">Viewer</option>
        </select>
        <Button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
        {error && <div style={{ color: colors.orange, marginBottom: '1rem' }}>{error}</div>}
        <div>Already have an account? <Link onClick={() => navigate('/login')}>Login</Link></div>
      </Form>
    </Container>
  );
}
