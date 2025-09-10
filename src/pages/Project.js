import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../services/ProjectService.tsx';
import { colors } from '../theme';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;
const Button = styled.button`
  background: ${colors.teal};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1.5rem;
  &:hover { background: ${colors.steel}; }
`;
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${colors.coolGray};
  border-radius: 6px;
  margin-right: 1rem;
`;

export default function Project() {
  const { id } = useParams(); // project ID
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await ProjectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
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
      setNewUserEmail("");
    } catch (err) {
      console.error("Failed to add user:", err);
      alert("Error adding user");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Wrapper>Loading project...</Wrapper>;
  if (!project) return <Wrapper>Project not found</Wrapper>;

  return (
    <Wrapper>
      <h2 style={{ color: colors.primary }}>{project.name}</h2>
      <p style={{ color: colors.steel }}>{project.description}</p>

      <div style={{ marginTop: "2rem" }}>
        <h3>Manage Access</h3>
        <Input
          type="email"
          placeholder="Enter user email"
          value={newUserEmail}
          onChange={e => setNewUserEmail(e.target.value)}
        />
        <Button onClick={handleAddUser} disabled={adding}>
          {adding ? "Adding..." : "Add User to Project"}
        </Button>
      </div>
    </Wrapper>
  );
}
