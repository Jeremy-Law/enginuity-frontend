import React, { useEffect, useState } from 'react';
import { getFiles } from '../services/FilesService.tsx';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { colors } from '../theme';

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
const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 2rem;
`;


export default function Files() {
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const files = await getFiles();
        setFileList(files);
      } catch {
        setError("Failed to load files.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar user={user} />
        <Content>
          <Title>All Files</Title>
          <div style={{ color: colors.steel }}>
            All Files From S3:
          </div>
          {loading && <div>Loading files...</div>}
          {error && <div style={{color: 'red'}}>{error}</div>}
          {!loading && !error && (
            <ul>
              {fileList.length === 0 && <li>No files found.</li>}
              {fileList.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          )}
        </Content>
      </Main>
    </Layout>
  );
}
