import axios from 'axios'
import { baseURL } from '../../utils/axiosInstance'

const getProducts = async (companyId, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-products/${companyId}`, {
    params
  })
}

const getProductById = async (producId, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-product/${producId}`, {
    params
  })
}


const getCompanyById = async (companyId, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-company/${companyId}`, {
    params
  })
}

export { getProducts, getProductById, getCompanyById }