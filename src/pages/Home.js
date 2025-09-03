import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.lightGray};
  overflow-x: hidden;
  overflow-y: auto;
`;



/* ---------- HEADER ---------- */
const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.teal};
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap; /* Stops overflow on small screens */
`;

const Button = styled.button`
  background: ${colors.primary};
  color: #fff;
  border: none;
  padding: 0.5rem 1.25rem;
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

/* ---------- HERO ---------- */
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(
    to bottom,
    ${colors.teal} 0%,
    ${colors.lightGray} 100%
  );
  color: white;
  box-sizing: border-box;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  color: ${colors.primary};
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  max-width: 800px;
  margin-bottom: 2rem;
  color: ${colors.primary};
`;

const CTAButton = styled(Button)`
  font-size: 1.25rem;
  padding: 1rem 2rem;
  border-radius: 6px;
`;

/* ---------- FEATURES GRID ---------- */
const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background: white;
  box-sizing: border-box;
`;

const FeatureCard = styled.div`
  background: ${colors.lightGray};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 0.75rem;
  color: ${colors.primary};
`;

const FeatureText = styled.p`
  color: ${colors.steel};
  font-size: 1rem;
`;

/* ---------- DEEP DIVE ---------- */
const DeepDiveSection = styled.section`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${({ bg }) => bg || 'transparent'};
  gap: 2rem;
  flex-wrap: wrap; /* Makes sure content stacks nicely */
  box-sizing: border-box;
`;

const DeepDiveText = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 600px;
`;

const DeepDiveTitle = styled.h2`
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

const DeepDiveDescription = styled.p`
  color: ${colors.steel};
  font-size: 1.1rem;
`;

const DeepDiveImage = styled.img`
  flex: 1;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

/* ---------- CONTACT ---------- */
const ContactSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: ${colors.teal};
  color: white;
  box-sizing: border-box;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 2rem auto 0;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  min-height: 120px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled(Button)`
  background: white;
  color: ${colors.primary};
  &:hover {
    background: ${colors.lightGray};
  }
`;

/* ---------- FOOTER ---------- */
const Footer = styled.footer`
  margin-top: auto;
  background: ${colors.teal};
  color: white;
  text-align: center;
  padding: 1rem;
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

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Logo src="/logo.png" alt="Enginuity Cloud Logo" />
          <h2 style={{ color: `${colors.primary}`, margin: 0 }}>Enginuity Cloud</h2>
        </div>
        <NavButtons>
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/register')}>Register</Button>
          <Button
            onClick={() => navigate('/dashboard')}
            disabled={!user}
            title={!user ? 'Sign in to access dashboard' : ''}
          >
            Dashboard
          </Button>
        </NavButtons>
      </Header>

      {/* HERO */}
      <HeroSection>
        <HeroTitle>Collaborate. Innovate. Engineer.</HeroTitle>
        <HeroSubtitle>
          A modern platform for managing engineering projects, files, and
          collaboration — built to capture and preserve your organization’s
          knowledge.
        </HeroSubtitle>
        <CTAButton onClick={() => navigate('/register')}>Get Started</CTAButton>
      </HeroSection>

      {/* FEATURES */}
      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>Upload & Tag Files</FeatureTitle>
          <FeatureText>
            Securely store and annotate engineering documents like CAD, DWG, and PDFs.
          </FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Collaborative Notes</FeatureTitle>
          <FeatureText>
            Capture design knowledge directly from your engineers before it’s lost.
          </FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Centralized Projects</FeatureTitle>
          <FeatureText>
            One platform to manage your projects, teams, and workflows.
          </FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Secure & Scalable</FeatureTitle>
          <FeatureText>
            Enterprise-grade security built for engineering organizations.
          </FeatureText>
        </FeatureCard>
      </FeaturesSection>

      {/* DEEP DIVES */}
      <DeepDiveSection>
        <DeepDiveText>
          <DeepDiveTitle>Upload & Tag Files</DeepDiveTitle>
          <DeepDiveDescription>
            Upload CAD drawings, PDFs, and other engineering files. Click anywhere on a file 
            to leave a question which will be stored for those who come after, streamlining the flow
            of knowledge.
          </DeepDiveDescription>
        </DeepDiveText>
        <DeepDiveImage src="/Civil.png" alt="Upload demo" />
      </DeepDiveSection>

      <DeepDiveSection reverse bg={colors.lightGray}>
        <DeepDiveText>
          <DeepDiveTitle>Others</DeepDiveTitle>
          <DeepDiveDescription>
            Engineers can leave comments, notes, and markups on designs directly
            inside Enginuity Cloud - ensuring that no tribal knowledge is lost.
          </DeepDiveDescription>
        </DeepDiveText>
        <DeepDiveImage src="/Mechanical.png" alt="Collaboration demo" />
      </DeepDiveSection>

      <DeepDiveSection>
        <DeepDiveText>
          <DeepDiveTitle>Centralized Dashboard</DeepDiveTitle>
          <DeepDiveDescription>
            Manage projects, permissions, view activity, and more all from 
            our central dashboard. Designd with management and engineers in mind.
          </DeepDiveDescription>
        </DeepDiveText>
        <DeepDiveImage src="/City.png" alt="Dashboard demo" />
      </DeepDiveSection>

      <DeepDiveSection reverse bg={colors.lightGray}>
        <DeepDiveText>
          <DeepDiveTitle>Enterprise Security</DeepDiveTitle>
          <DeepDiveDescription>
            With robust access controls, encryption, and compliance-ready design,
            Enginuity Cloud ensures your organization's intellectual property is
            safe. <br/>NIST SP 800-171, DFARS 252.204-7012, CMMC, ITAR compliant.
          </DeepDiveDescription>
        </DeepDiveText>
        <DeepDiveImage src="/Aero.png" alt="Security demo" />
      </DeepDiveSection>

      {/* CONTACT */}
      <ContactSection>
        <h2>Get in Touch</h2>
        <p>
          Want a demo or have questions? Fill out the form below and we'll get back to you.
        </p>
        <ContactForm
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted! (You can hook this to an API)');
          }}
        >
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <TextArea placeholder="Your Message" required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
      </ContactSection>

      {/* FOOTER */}
      <Footer>
        © {new Date().getFullYear()} Enginuity Cloud. All rights reserved.
      </Footer>
    </Container>
  );
}