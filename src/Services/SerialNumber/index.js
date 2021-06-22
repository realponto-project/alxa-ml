import axiosIntance from '../../utils/axiosInstance'

const getBySerialNumber = async (params = {}) => {
  return await axiosIntance.get('/serials', { params })
}

const createSerialNumbers = async (values = {}) => {
  return await axiosIntance.post('/serials', values)
}

const associateSerialNumber = async (values = {}) => {
  return await axiosIntance.put('/serials-associate', values)
}

const getSerialOrderOutputs = async (params = {}) => {
  return await axiosIntance.get('/serials', { params })
}

const getAll = async (params = {}) => {
  return await axiosIntance.get('/serials', { params })
}


const updateSerial = async (id, values = {}) => {
  return await axiosIntance.put(`/serials/${id}`, values)
}

export {
  getAll,
  getBySerialNumber,
  createSerialNumbers,
  associateSerialNumber,
  getSerialOrderOutputs,
  updateSerial
}
