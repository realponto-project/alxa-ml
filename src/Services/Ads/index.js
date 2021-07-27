import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/ml-ads', { params })
}

const updateAds = async (values) => {
  return await axiosIntance.put('/ml-ads/', values)
}

const updateAd = async (id, values) => {
  return await axiosIntance.put(`/ml-ad/${id}`, values)
}

const syncPrice = async (id, values) => {
  return await axiosIntance.put(`/ml-sync-price/${id}`, values)
}

const getCusmtomerById = async (id) => {
  return await axiosIntance.get(`/customers/${id}`)
}

const createCustomer = async (values) => {
  return await axiosIntance.post('/customers', values)
}

const updateCustomer = async (values) => {
  return await axiosIntance.put(`/customers/${values.id}`, values)
}

export {
  getAll,
  getCusmtomerById,
  createCustomer,
  updateCustomer,
  updateAds,
  updateAd,
  syncPrice
}
