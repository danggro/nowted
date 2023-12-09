export const baseUrl =
  process.env.NODE_ENV === 'development' || 'test'
    ? process.env.BACKEND_DEV
    : process.env.BACKEND_PROD
