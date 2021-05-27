import axiosIntance from '../../utils/axiosInstance'

export const getAllAccounts = async () => {
  return await axiosIntance.get('/ml-accounts')
}

export const getLoaderAdsByMlAccountId = async (mlAccountId, params = {}) => {
  return await axiosIntance.get(`/ml-load-ads/${mlAccountId}`, { params })
}

export const updateAds = async (values) => {
  return await axiosIntance.put('/ml-ads/', values)
}
