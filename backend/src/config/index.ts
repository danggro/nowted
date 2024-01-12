import 'dotenv/config'
import { Environment } from '../types'

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001
const REDIS_URL = process.env.REDIS_URL
const NODE_ENV = process.env.NODE_ENV as Environment

export { DATABASE_URL, PORT, REDIS_URL, NODE_ENV }
