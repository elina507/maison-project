import apiClient from './client'

export const fetchRestaurant = async () => {
  const response = await apiClient.get('/restaurant/')
  return response.data
}