import axiosIntance from '../../utils/axiosInstance'

const createProduct = async (values) => {
  return await axiosIntance.post('/products', values)
}

const getAll = async (params = {}) => {
  return await axiosIntance.get('products', { params })
}

const getProductByBarCode = async (barCode) => {
  return await axiosIntance.get(`/products-barcode/${barCode}`)
}

const getProductById = async (id) => {
  return await axiosIntance.get(`/products/${id}`)
}

const updateProduct = async (values) => {
  return await axiosIntance.put(`/products/${values.id}`, values)
}

const getTransactionsToChart = async (id) => {
  return await axiosIntance.get(`/products-transactions/${id}`)
}

const removeImage = async (productImageId) => {
  return await axiosIntance.delete(`/remove-image/${productImageId}`)
}

const getAllImagesByProductId = async (productId) => {
  return await axiosIntance.get(`/fetch-images/${productId}`)
}

export {
  createProduct,
  getAll,
  getProductByBarCode,
  getProductById,
  updateProduct,
  getTransactionsToChart,
  removeImage,
  getAllImagesByProductId
}
