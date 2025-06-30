import axios from 'axios';

const API_BASE_URL = 'http://localhost:3006/api';

export const fetchProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`, {
    headers: {
      'x-api-key': 'af3bd6a7-bd91-4e55-addc-f4550d2cbd3c'
    }
  });
  return response.data;
};

export const saveProperty = async (propertyData: any) => {
  const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
    headers: {
      'x-api-key': 'af3bd6a7-bd91-4e55-addc-f4550d2cbd3c'
    }
  });
  return response.data;
};