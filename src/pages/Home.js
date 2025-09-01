import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${colors.lightGray};
  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row; 
  align-items: flex-start;
  justify-content: space-between;
  background: ${colors.teal};
  margin: 0;
`;


const Title = styled.h1`
  color: ${colors.primary};
  font-size: 40px;
  margin: 0;
  padding: 0 1rem;
`;
const Text = styled.p`
  color: ${colors.steel};
  font-size: 1.2rem;
  font-weight: bold;
  max-width: 600px;
  padding: 0 1rem;
`;



export default function Home() {
  const navigate = useNavigate();
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }, []);

  const images = ['Civil', 'Mechanical', 'City', 'Aero'];
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Container>
      <Header>
        <div>
          <Title>Enginuity Cloud</Title>
          <Text>
            Powering the future of engineering collaboration.
          </Text>
          <Text>
            Collaborate. Innovate. Engineer.
          </Text>
        </div>
        {/*
        <VideoWrapper>
          <video width="100%" height="auto" autoPlay loop muted playsInline style={{ maxWidth: 800 }}>
            <source src="/Engineering.mp4" type="video/mp4" />
            <source src="/Engineering.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </VideoWrapper>
        */}
        <SlideshowWrapper>
          <SlideshowImage src={`/${images[current]}.png`} alt={images[current]} />
        </SlideshowWrapper>
      </Header>
      <Text>
        Enginuity Cloud is a modern platform for managing engineering projects, files, and collaboration.<br />
        Sign in to access your dashboard, upload files, and manage your projects.
      </Text>
      <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/register')}>Register</Button>
        <Button onClick={() => navigate('/dashboard')} disabled={!user} title={!user ? 'Sign in to access dashboard' : ''}>
          Dashboard
        </Button>
      </div>
    </Container>
  );
}


// const VideoWrapper = styled.div`
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   max-width: 800px;
//   flex: 1;
//   video {
//     display: block;
//     width: 100%;
//     height: auto;
//   }
// `;

const SlideshowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 450px;
  background: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  margin-left: 2rem;
`;

const SlideshowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  background: ${colors.primary};
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: ${colors.teal};
  }
  &:disabled {
    background: ${colors.coolGray};
    cursor: not-allowed;
  }
`;
