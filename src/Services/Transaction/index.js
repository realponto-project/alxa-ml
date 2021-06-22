import axiosIntance from '../../utils/axiosInstance'

const createTransactions = (values) => {
  return axiosIntance.post('/transactions', values)
}

export { createTransactions }
