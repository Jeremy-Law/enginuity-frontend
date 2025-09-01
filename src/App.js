
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { colors } from './theme';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.lightGray};
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  }
`;

function App() {
  const [user, setUser] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  React.useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <AppRoutes user={user} />
      </Router>
    </>
  );
}

export default App;
