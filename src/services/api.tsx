import axios from 'axios';

const client_id = '8f855d02f6c8bf6b62fa';
const client_secret = 'd478ae5c31ce83c67b8ee5a064131bd4af5e25d0';

const api = axios.create({
  baseURL: 'https://api.github.com',
  params: {
    client_id,
    client_secret
  }
});

export default api;