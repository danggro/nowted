import { createClient } from 'redis'
// import { promisify } from 'util'
import { REDIS_URL } from '.'

const clientRedis = createClient({
  url: REDIS_URL,
})

export { clientRedis }
