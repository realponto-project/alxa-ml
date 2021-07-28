import axiosIntance from '../../utils/axiosInstance'

const getAllChangePrice = async (params) => {
  return await axiosIntance.get('/changePrice', { params })
}

export { getAllChangePrice }
