import apiClient from './client'

export const createBooking = async (bookingData) => {
  const response = await apiClient.post('/bookings/', bookingData)
  return response.data
}