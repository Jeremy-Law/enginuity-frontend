import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 220px;
  background: ${colors.primary};
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  display: block;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px 0 0 4px;
  &.active {
    background: ${colors.steel};
    color: ${colors.orange};
  }
  &:hover {
    background: ${colors.steel};
  }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <Logo>
        <span style={{ color: colors.orange, fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '0.5px' }}>Enginuity</span>
        <LogoImg src="/favicon.svg" alt="Enginuity Cloud Logo" />
      </Logo>
      <Nav>
        <StyledLink to="/dashboard">Projects</StyledLink>
        <StyledLink to="/dashboard/files">Files</StyledLink>
        <StyledLink to="/dashboard/settings">Settings</StyledLink>
      </Nav>
    </SidebarContainer>
  );
}
