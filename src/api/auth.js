import apiClient from './client'

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login/', credentials)
  return response.data
}

export const refreshToken = async (refresh) => {
  const response = await apiClient.post('/auth/refresh/', { refresh })
  return response.data
}

export const fetchProfile = async () => {
  const response = await apiClient.get('/auth/profile/')
  return response.data
}