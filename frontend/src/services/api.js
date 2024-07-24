import axios from 'axios';

const API_URL = 'http://localhost:2222/camplight/api';

const apiClient = axios.create({
  baseURL: 'http://localhost:2222/camplight/api'
});

export const fetchUsers = (page = 1, perPage = 5, search = '') => {
  const params = new URLSearchParams({
    page,
    per_page: perPage,
  });

  if (search) {
    params.append('search', search);
  }

  return apiClient.get('/users', {
    params: {
      search,page, per_page: perPage
    }
  })
    .then(response => {
      console.log("DATA", response.data);
      return response; // Return the entire response, or response.data if you prefer
    })
    .catch(error => {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      throw error; // Rethrow error for further handling
    });
};

export const newUser = (newUser) => {
  return apiClient.post(`${API_URL}/users`, { ...newUser })
    .then(response => {
      console.log("DATA", response.data);
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const updateUser = (userId, newUser) => {
  return apiClient.put(`${API_URL}/users/${userId}`, { ...newUser })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserById = (id) => {
  return apiClient.get(`${API_URL}/users/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const deleteUserById = (id) => {
  return apiClient.delete(`${API_URL}/users/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};
