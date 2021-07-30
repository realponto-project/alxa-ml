import axiosIntance from '../../utils/axiosInstance'

const getWorkerInfo = async () => {
  return await axiosIntance.get('/worker')
}

export { getWorkerInfo }
