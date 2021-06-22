import axios from 'axios'

export const baseURL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({ baseURL: `${baseURL}/api` })

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    ...config.headers
  }
}))

export default axiosInstance
