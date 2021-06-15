import axiosIntance from '../../utils/axiosInstance'

const getAllAccountML = async () => {
  return await axiosIntance.get('/ml-accounts')
}

export { getAllAccountML }
