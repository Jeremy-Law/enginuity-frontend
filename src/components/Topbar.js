import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import { useNavigate } from 'react-router-dom';

const TopbarContainer = styled.div`
  height: 60px;
  background: #fff;
  border-bottom: 1px solid ${colors.coolGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;
const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.primary};
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.teal};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
`;
const Dropdown = styled.div`
  background: #fff;
  border: 1px solid ${colors.coolGray};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  position: absolute;
  right: 2rem;
  top: 60px;
  z-index: 10;
`;

export default function Topbar({ user, onLogout }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <TopbarContainer>
      <Logo style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Enginuity Cloud</Logo>
      <Profile>
        <Avatar onClick={() => setOpen(o => !o)}>{user?.name?.[0] || 'U'}</Avatar>
        {open && (
          <Dropdown>
            <div style={{ marginBottom: 8 }}>{user?.name || 'User'}</div>
            <div style={{ marginBottom: 8, cursor: 'pointer' }} onClick={() => console.log("Clicked")}>Profile Settings</div>
            <div style={{ color: colors.teal, cursor: 'pointer' }} onClick={onLogout}>Logout</div>
          </Dropdown>
        )}
      </Profile>
    </TopbarContainer>
  );
}
