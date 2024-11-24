import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPerson, updatePerson, getPeople } from '../api';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormHeading = styled.h2`
  text-align: center;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #2980b9;
  }
`;

const PersonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getPeople(id)
        .then((response) => {
          setName(response.data.name);
          setAge(response.data.age);
          setGender(response.data.gender);
          setMobileNumber(response.data.mobile_number);
        })
        .catch((error) => {
          console.error('Error fetching person data:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = { name, age, gender, mobile_number: mobileNumber };

    if (isEditing) {
      updatePerson(id, person)
        .then(() => navigate('/'))
        .catch((error) => console.error('Error updating person:', error));
    } else {
      createPerson(person)
        .then(() => navigate('/'))
        .catch((error) => console.error('Error creating person:', error));
    }
  };

  return (
    <FormContainer>
      <FormHeading>{isEditing ? 'Edit Person' : 'Add New Person'}</FormHeading>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Age</Label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Gender</Label>
          <Input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Mobile Number</Label>
          <Input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">
          {isEditing ? 'Update' : 'Create'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default PersonForm;
