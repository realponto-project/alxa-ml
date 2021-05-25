import axiosIntance from '../../utils/axiosInstance'

const getAllAccountML = async () => {
  return await axiosIntance.get('/ml-accounts')
}

const refreshToken = async (id) => {
  return await axiosIntance.put(`/ml-refreshToken/${id}`)
}

export { getAllAccountML, refreshToken }
