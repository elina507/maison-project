import apiClient from './client'

export const fetchCategories = async () => {
  const response = await apiClient.get('/categories/')
  return response.data
}