import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
// import { uploadFile, addTag } from '../services/api';
import { colors } from '../theme';
import { useParams, useNavigate } from 'react-router-dom';

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
const FileTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${colors.coolGray};
  margin-bottom: 2rem;
  border-collapse: collapse;
`;
const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: ${colors.steel};
  color: #fff;
`;
const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${colors.coolGray};
`;
const Tag = styled.span`
  background: ${colors.teal};
  color: #fff;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;
const AddTagInput = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${colors.coolGray};
  margin-right: 0.5rem;
`;
const UploadButton = styled.label`
  background: ${colors.orange};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 2rem;
  display: inline-block;
`;

const initialFiles = [
  { id: 'f1', name: 'BridgeDesign.pdf', tags: ['Bridge'], uploadDate: '2025-08-01' },
  { id: 'f2', name: 'Hydraulics.docx', tags: ['Hydraulics'], uploadDate: '2025-08-10' },
];

export default function Project() {
  const [files, setFiles] = useState(initialFiles);
  const [user, setUser] = useState(null);
  const [tagInput, setTagInput] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // const handleUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   const data = await uploadFile(file);
  //   setFiles(f => [...f, data]);
  // };

  // const handleAddTag = async (fileId) => {
  //   const tag = tagInput[fileId]?.trim();
  //   if (!tag) return;
  //   await addTag(fileId, tag);
  //   setFiles(f => f.map(file => file.id === fileId ? { ...file, tags: [...file.tags, tag] } : file));
  //   setTagInput(t => ({ ...t, [fileId]: '' }));
  // };

  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar user={user} onLogout={handleLogout} />
        <Content>
          <Title>Project Files</Title>
          <UploadButton>
            Upload File
            <input type="file" style={{ display: 'none' }} onChange={handleUpload} />
          </UploadButton>
          <FileTable>
            <thead>
              <tr>
                <Th>Filename</Th>
                <Th>Tags</Th>
                <Th>Upload Date</Th>
                <Th>Add Tag</Th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.id}>
                  <Td>{file.name}</Td>
                  <Td>{file.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Td>
                  <Td>{file.uploadDate}</Td>
                  <Td>
                    <AddTagInput
                      type="text"
                      placeholder="Add tag"
                      value={tagInput[file.id] || ''}
                      onChange={e => setTagInput(t => ({ ...t, [file.id]: e.target.value }))}
                    />
                    <button onClick={() => handleAddTag(file.id)} style={{ padding: '0.5rem 1rem', borderRadius: 4, border: 'none', background: colors.teal, color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Add</button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </FileTable>
        </Content>
      </Main>
    </Layout>
  );
}
