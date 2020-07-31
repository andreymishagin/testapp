import axios from 'axios';
import { Notify } from 'quasar';

export const axiosInstance = axios.create({
  baseURL: '/api/',
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
  if (error.toString() !== 'Cancel') {
    Notify.create({
      message: (error.response.data && error.response.data.message) || `${error.response.status}: ${error.response.statusText}`,
      icon: 'mdi-alert-circle',
      color: 'negative',
      position: 'bottom-right',
    });
  }
  return Promise.reject(error.response);
});
