import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { colors } from '../theme';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../services/ProjectService.tsx';

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
const CreateButton = styled.button`
  background: ${colors.teal};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 2rem;
  &:hover { background: ${colors.steel}; }
`;

/* --- Popup Modal Styles --- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${colors.coolGray};
  border-radius: 6px;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${colors.coolGray};
  border-radius: 6px;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
const CancelButton = styled.button`
  background: ${colors.coolGray};
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const SaveButton = styled.button`
  background: ${colors.teal};
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await ProjectService.getAllProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      alert("Project name is required");
      return;
    }
    if (!user) {
      alert("You must be logged in to create a project.");
      return;
    }

    // Choose a stable identifier for created_by
    const createdBy =
      user.id || user._id || user.uid || user.email;

    if (!createdBy) {
      alert("Cannot determine the current user ID/email for created_by.");
      return;
    }

    try {
      setLoading(true);
      const resp = await ProjectService.createProject({
        name: newProjectName,
        description: newProjectDesc,
        created_by: createdBy, // <-- send creator
      });

      // Handle either { project: {...} } or plain project object
      const createdProject = resp?.project ?? resp;

      if (!createdProject?.id) {
        console.warn("CreateProject response unexpected:", resp);
      }

      setProjects(prev => [...prev, createdProject]);
      setShowModal(false);
      setNewProjectName("");
      setNewProjectDesc("");
    } catch (err) {
      console.error("Failed to create project:", err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

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
          <CreateButton onClick={() => setShowModal(true)}>
            + Create Project
          </CreateButton>

          {projects.length > 0 ? (
            projects.map(p => (
              <ProjectCard
                key={p.id}
                onClick={() => navigate(`/project/${p.id}`)}
              >
                <h3>{p.name}</h3>
                <p style={{ color: colors.steel }}>{p.description}</p>
              </ProjectCard>
            ))
          ) : (
            <div style={{ color: colors.steel }}>No projects yet.</div>
          )}
        </Content>
      </Main>

      {showModal && (
        <Overlay>
          <Modal>
            <h3>Create New Project</h3>
            <Input
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
            />
            <Textarea
              rows={3}
              placeholder="Project Description"
              value={newProjectDesc}
              onChange={e => setNewProjectDesc(e.target.value)}
            />
            <ModalActions>
              <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
              <SaveButton onClick={handleCreateProject} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </SaveButton>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
    </Layout>
  );
}
