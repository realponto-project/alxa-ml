import axiosIntance from '../../utils/axiosInstance'

export const getAllAccounts = async () => {
  return await axiosIntance.get('/ml-accounts')
}

export const getLoaderAdsByMlAccountId = async (mlAccountId, params = {}) => {
  return await axiosIntance.get(`/ml-load-ads/${mlAccountId}`, { params })
}

export const updateAdsByAccount = async (mlAccountId, body) => {
  return await axiosIntance.post(`/ml-update-ads/${mlAccountId}`, body)
}
