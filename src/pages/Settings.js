import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { colors } from '../theme';
import UserService from '../services/UserService.tsx';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Main = styled.div`
  flex: 1;
  background: ${colors.lightGray};
`;
const Content = styled.div`
  padding: 2rem;
`;
const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 2rem;
`;

export default function Settings() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUsers();
        setUsers(data.data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar user={user} />
        <Content>
          <Title>Settings</Title>
          <div style={{ color: colors.steel, marginBottom: 24 }}>
            User List from Backend:
          </div>
          {loading && <div>Loading users...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {!loading && !error && (
            <ul>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((u, i) => (
                  <li key={u.id || i}>
                    {u.name && <span>{u.name}</span>}
                    {u.email && <span style={{ marginLeft: 8, color: colors.steel }}>({u.email})</span>}
                    {!u.name && !u.email && <span>{JSON.stringify(u)}</span>}
                  </li>
                ))
              ) : (
                <li>No users found.</li>
              )}
            </ul>
          )}
        </Content>
      </Main>
    </Layout>
  );
}
