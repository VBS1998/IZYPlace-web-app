import axios, {AxiosInstance} from 'axios'

export const axiosClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type' : 'application/json'
  },
  timeout: 2000,
})