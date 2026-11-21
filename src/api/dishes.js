import apiClient from './client'

export const fetchDishes = async (params = {}) => {
  const response = await apiClient.get('/dishes/', { params })
  return response.data
}

export const fetchDishById = async (id) => {
  const response = await apiClient.get(`/dishes/${id}/`)
  return response.data
}