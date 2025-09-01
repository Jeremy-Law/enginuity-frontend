import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
// import { getProjects } from '../services/api';
import { colors } from '../theme';
import { useNavigate } from 'react-router-dom';

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
const ProjectCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${colors.coolGray};
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  border-left: 6px solid ${colors.teal};
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 16px ${colors.coolGray}; }
`;
const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 2rem;
`;

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    // Projects API not available
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar user={user} onLogout={handleLogout} />
        <Content>
          <Title>Projects</Title>
          <div style={{ color: colors.steel }}>
            Projects API not available.
          </div>
        </Content>
      </Main>
    </Layout>
  );
}
