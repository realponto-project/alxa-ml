import axiosIntance from '../../utils/axiosInstance'

const createAccountService = async (values) => {
  return await axiosIntance.post('/ml-accounts', values)
}

export { createAccountService }
