import axios, {AxiosInstance} from 'axios'

const hostname = 'http://localhost:8000'

export const axiosClient: AxiosInstance = axios.create({
  baseURL: hostname + '/api',
  headers: {
    'Content-Type' : 'application/json'
  },
  timeout: 2000,
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage (or any storage you're using)
  if (token) {
      config.headers.Authorization = `${token}`;
  }
  return config;
});

export const imagesUrl: string =  hostname + '/images/'