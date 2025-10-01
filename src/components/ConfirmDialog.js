import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <Box>
        <Title id="confirm-title">{title}</Title>
        {description && <Text>{description}</Text>}

        <Actions>
          <CancelBtn onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </CancelBtn>
          <DeleteBtn onClick={onConfirm} disabled={loading}>
            {loading ? 'Working…' : confirmLabel}
          </DeleteBtn>
        </Actions>
      </Box>
    </Overlay>
  );
}

/* ---- styles ---- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  z-index: 50;
`;

const Box = styled.div`
  background: #fff;
  width: 100%;
  max-width: 420px;
  border-radius: 14px;
  border: 1px solid ${colors.coolGray};
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  padding: 1.25rem 1.25rem 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: ${colors.primary};
`;

const Text = styled.p`
  margin: 0 0 1rem;
  color: ${colors.steel};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const CancelBtn = styled.button`
  border: 1px solid ${colors.coolGray};
  background: #fff;
  color: ${colors.primary};
  border-radius: 8px;
  padding: 0.5rem 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: ${colors.lightGray}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const DeleteBtn = styled.button`
  border: 1px solid #cf5b5b;
  background: #cf2e2e;
  color: #fff;
  border-radius: 8px;
  padding: 0.5rem 0.9rem;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #b92626; }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;
