import axios from 'axios';
import {env} from '@/helpers/env';

export const signup = async (userData) => {
  const formData = new FormData();
  if (userData.username) {
    formData.append('username', userData.username);
  }
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  formData.append('confirmPassword', userData.confirmPassword);

  const response = await axios.post(`${env.API_URL}/users/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const login = async (userData) => {
  const formData = new FormData();

  formData.append('email', userData.email);
  formData.append('password', userData.password);

  const response = await axios.post(`${env.API_URL}/users/login`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const loadUser = async () => {
  const token = JSON.parse(localStorage.getItem('user')).accessToken;

  const response = await axios.get(`${env.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
