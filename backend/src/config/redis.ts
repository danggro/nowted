import { createClient } from 'redis'
import { REDIS_URL } from '.'

const clientRedis = createClient({
  url: REDIS_URL,
})

export { clientRedis }
