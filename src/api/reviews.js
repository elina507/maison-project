import apiClient from './client'

export const fetchReviews = async () => {
  const response = await apiClient.get('/reviews/')
  return response.data
}

export const createReview = async (reviewData) => {
  const response = await apiClient.post('/reviews/', reviewData)
  return response.data
}