import 'dotenv/config'

export default {
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: (process.env.PORT || 3001) as number,
  SECRET: process.env.SECRET as string,
}
