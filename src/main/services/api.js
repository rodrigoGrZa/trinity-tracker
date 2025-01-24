import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const api = axios.create({
  baseURL: 'https://127.0.0.1:2999',
  httpsAgent,
});

export default api;

