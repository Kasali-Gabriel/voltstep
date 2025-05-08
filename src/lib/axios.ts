import axios from 'axios';

const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
