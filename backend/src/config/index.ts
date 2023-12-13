import 'dotenv/config'
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
const REDIS_URL = process.env.REDIS_URL
const KEY_REDIS = 'loggedUserRedsi'
export { DATABASE_URL, PORT, SECRET, REDIS_URL, KEY_REDIS }
