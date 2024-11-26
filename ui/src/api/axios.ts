import axios, {AxiosInstance} from 'axios'

const hostname = 'http://localhost:8000'

export const axiosClient: AxiosInstance = axios.create({
  baseURL: hostname + '/api',
  headers: {
    'Content-Type' : 'application/json'
  },
  timeout: 2000,
})

export const imagesUrl: string =  hostname + '/images/'