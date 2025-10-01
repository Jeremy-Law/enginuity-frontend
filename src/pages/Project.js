// src/pages/Project.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectService from '../services/ProjectService.tsx'; // ensure this file exports JS (not TS types)
import UserService from '../services/UserService.tsx';
import { colors } from '../theme';
import styled from 'styled-components';


export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [users, setUsers] = useState([]);
  const [addingEmail, setAddingEmail] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await ProjectService.getProject(id);
        setProject(projectData);
        const userData = await UserService.getUsers();
        setUsers(userData || []);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleAddUser = async () => {
    if (!newUserEmail) return;
    try {
      setAdding(true);
      await ProjectService.addUserToProject(id, newUserEmail);
      alert(`User ${newUserEmail} added to project!`);
      setNewUserEmail('');
    } catch (err) {
      console.error('Failed to add user:', err);
      alert('Error adding user');
    } finally {
      setAdding(false);
    }
  };

  const TopBarUI = (
    <Topbar>
      <BackButton onClick={() => navigate('/dashboard')}>← Projects</BackButton>
      <TopTitle>{project?.name || (loading ? 'Loading…' : 'Project')}</TopTitle>
    </Topbar>
  );

  if (loading) {
    return (
      <>
        {TopBarUI}
        <Page>
          <Main>Loading project...</Main>
        </Page>
      </>
    );
  }

  if (!project) {
    return (
      <>
        {TopBarUI}
        <Page>
          <Main>Project not found</Main>
        </Page>
      </>
    );
  }

  return (
    <>
      {TopBarUI}
      <Page>
        <Sidebar>
          <SidebarHeader>Users</SidebarHeader>
          <UserList>
            {users.length === 0 && (
              <div style={{ color: colors.steel, padding: '0.5rem 0.75rem' }}>
                No users found.
              </div>
            )}
            {users.map((u) => {
              const name = u.name || u.fullName || u.displayName || u.email || 'User';
              const initials = (name || '')
                .split(' ')
                .map((s) => s[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              const email = u.email;

              return (
                <UserTile key={u.id || u._id || email}>
                  <Avatar>{initials || 'U'}</Avatar>
                  <UserMeta>
                    <UserName>{name}</UserName>
                    <UserEmail>{email}</UserEmail>
                  </UserMeta>
                  <AddUserBtn
                    onClick={() => handleAddUser(email)}
                    disabled={!email || addingEmail === email}
                    title="Add this user to the project"
                  >
                    {addingEmail === email ? 'Adding…' : '+ Add'}
                  </AddUserBtn>
                </UserTile>
              );
            })}

          </UserList>
        </Sidebar>
        <Main>
          <Title>{project.name}</Title>
          <Subtitle>{project.description}</Subtitle>
        </Main>
      </Page>
    </>
  );
}


const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
  border-bottom: 1px solid ${colors.coolGray};
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BackButton = styled.button`
  appearance: none;
  border: 1px solid ${colors.coolGray};
  background: #fff;
  color: ${colors.primary};
  border-radius: 10px;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.05s ease;
  &:hover { background: ${colors.lightGray}; }
  &:active { transform: translateY(1px); }
`;

const TopTitle = styled.div`
  font-weight: 700;
  color: ${colors.primary};
  font-size: 1.05rem;
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  padding: 2rem;
  min-height: calc(100vh - 4rem);
  background: ${colors.lightGray};
`;

const Sidebar = styled.aside`
  background: #fff;
  border: 1px solid ${colors.coolGray};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${colors.coolGray};
  font-weight: 700;
  color: ${colors.primary};
`;

const UserList = styled.div`
  overflow-y: auto;
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const UserTile = styled.div`
  border: 1px solid ${colors.coolGray};
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  background: #fafafa;
  display: grid;
  grid-template-columns: 40px 1fr auto; /* avatar | meta | button */
  gap: 0.75rem;
  align-items: center;
`;

const AddUserBtn = styled.button`
  border: 1px solid ${colors.coolGray};
  background: #fff;
  color: ${colors.primary};
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: ${colors.lightGray}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;


const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: ${colors.teal};
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${colors.primary};
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: ${colors.steel};
  word-break: break-all;
`;

const Main = styled.main`
  background: #fff;
  border: 1px solid ${colors.coolGray};
  border-radius: 12px;
  padding: 1.5rem;
`;

const Title = styled.h2`
  color: ${colors.primary};
  margin: 0 0 0.5rem;
`;

const Subtitle = styled.p`
  color: ${colors.steel};
  margin: 0;
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${colors.coolGray};
  border-radius: 8px;
  min-width: 260px;
`;

const Button = styled.button`
  background: ${colors.teal};
  color: #fff;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: ${colors.steel}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;