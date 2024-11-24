import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPeople, deletePerson } from '../api';
import styled from 'styled-components';

// Styled-components for clean, scoped styling
const Container = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

const PeopleListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const PersonItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #3498db;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.error('Error fetching people:', error);
      });
  }, []);
  const handleDelete = (id) => {
    console.log(id)
    if (!id) {
        console.error('Invalid person ID');
        return;
      }
    if (window.confirm("Are you sure you want to delete this person?")) {
      deletePerson(id)
        .then(() => {
          setPeople(people.filter((person) => person.id !== id));
          window.location.reload(); // This will reload the current page

        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    }
  };
  

  return (
    <Container>
      <Heading>People List</Heading>
      <LinkStyled to="/add">Add New Person</LinkStyled>
      <PeopleListContainer>
        {people.map((person) => (
          <PersonItem key={person.id}>
            <span>{person.name} ({person.age}) - {person.gender} - {person.mobile_number}</span>
            <div>
              <LinkStyled to={`/edit/${person._id}`}>Edit</LinkStyled>
              <Button onClick={() => handleDelete(person._id)}>Delete</Button>
            </div>
          </PersonItem>
        ))}
      </PeopleListContainer>
    </Container>
  );
};

export default PeopleList;
