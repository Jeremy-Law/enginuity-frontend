import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../services/ProjectService.tsx';
import { colors } from '../theme';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

export default function Project() {
  const { id } = useParams(); // get project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await ProjectService.getProject(id);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <Wrapper>Loading project...</Wrapper>;
  if (!project) return <Wrapper>Project not found</Wrapper>;

  return (
    <Wrapper>
      <h2 style={{ color: colors.primary }}>{project.name}</h2>
      <p style={{ color: colors.steel }}>{project.description}</p>
      {/* Add project details/components here */}
    </Wrapper>
  );
}