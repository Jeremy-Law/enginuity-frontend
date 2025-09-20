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
  const userService = UserService;

  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar user={user} />
        <Content>
          <Title>Settings</Title>
        </Content>
      </Main>
    </Layout>
  );
}
