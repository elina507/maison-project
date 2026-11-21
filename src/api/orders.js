import apiClient from './client'

export const createOrder = async (orderData) => {
  const response = await apiClient.post('/orders/', orderData)
  return response.data
}