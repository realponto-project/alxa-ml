import axiosIntance from '../../utils/axiosInstance'

const getAllAccountML = async () => {
  return await axiosIntance.get('/ml-accounts')
}

const toogleActiveAd = async (id) => {
  return await axiosIntance.patch(`/ml-ad-toggle-active/${id}`)
}

export { getAllAccountML, toogleActiveAd }
