import axios from 'axios'
import { UNEXPECTED_ERROR } from 'redux/constants/authConstants'
import { baseUrl } from 'utils/contants'

export const API = axios.create({
  baseURL: baseUrl,
})

export const handleApiError = async (error: unknown) => {
  if (!axios.isAxiosError(error))
    throw new Error('An unexpected error occurred.')

  try {
    const objectError = error.response?.data || UNEXPECTED_ERROR
    const data = null

    return { error: objectError, data }
  } catch (err) {
    throw new Error('An unexpected error occurred.')
  }
}

export const setConfig = (accessToken: string | undefined) => {
  if (accessToken) {
    return {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  } else {
    return {}
  }
}
