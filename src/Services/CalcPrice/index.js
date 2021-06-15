import axiosIntance from '../../utils/axiosInstance'

const getAllCalcPrice = async (params = {}) => {
  return await axiosIntance.get('/calcPrice', { params })
}
export { getAllCalcPrice }
