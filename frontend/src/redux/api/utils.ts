import axios from 'axios'
import { baseUrl } from 'utils/contants'

export const API = axios.create({
  baseURL: baseUrl,
})

export const handleApiError = async (error: unknown) => {
  if (!axios.isAxiosError(error))
    throw new Error('An unexpected error occurred.')

  try {
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred.'
    const data = null

    return { error: errorMessage, data }
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
