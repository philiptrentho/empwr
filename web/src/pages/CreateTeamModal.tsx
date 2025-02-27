import React, { useState } from 'react';

import { TeamData } from '@/types/interfaces/types';

import { addTeam } from '../components/Firebase/firebase';
interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSubmitTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
  setSubmitTrigger,
}) => {
  // @ts-expect-error idk what this is tbh
  const [formData, setFormData] = useState<TeamData>({
    name: '',
    follow: false,
    permissions: 'viewer',
  });
  if (!isOpen) return null;

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle: React.CSSProperties = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '100%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const formActionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTeam(formData);
      onClose();
      setSubmitTrigger((prevState: boolean) => !prevState);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              name="name"
              style={inputStyle}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Follow:</label>
            <input
              type="checkbox"
              name="follow"
              checked={formData.follow}
              onChange={handleChange}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Permissions:</label>
            <select
              name="permissions"
              style={selectStyle}
              value={formData.permissions}
              onChange={handleChange}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={formActionsStyle}>
            <button type="button" style={secondaryButtonStyle} onClick={onClose}>
              Close
            </button>
            <button type="submit" style={primaryButtonStyle}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
