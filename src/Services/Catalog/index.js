import axios from 'axios'
import { baseURL } from '../../utils/axiosInstance'

const getProducts = async (nickName, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-products/${nickName}`, {
    params
  })
}

const getProductById = async (producId, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-product/${producId}`, {
    params
  })
}

const getCompanyByNickName = async (nickName, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-company/${nickName}`, {
    params
  })
}

export { getProducts, getProductById, getCompanyByNickName }
