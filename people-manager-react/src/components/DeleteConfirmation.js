import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePerson } from '../api';

const DeleteConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    deletePerson(id)
      .then(() => navigate('/'))
      .catch((error) => console.error('Error deleting person:', error));
  };

  return (
    <div className="delete-confirmation-container">
      <p>Are you sure you want to delete this person?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmation;
