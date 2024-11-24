import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const getPeople = () => {
  return axios.get(`${API_URL}persons/`);
};

export const createPerson = (person) => {
  return axios.post(`${API_URL}persons/`, person);
};

export const updatePerson = (id, person) => {
  return axios.put(`${API_URL}persons/${id}/`, person);
};

export const deletePerson = (id) => {
  return axios.delete(`${API_URL}personsdel/${id}/`);
};
