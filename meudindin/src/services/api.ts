import axios from 'axios';

// Configuração do Axios com a URL base
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export default api;
