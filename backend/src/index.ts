import app from './app'

import { connectToDatabase } from './config/db'
import { PORT } from './config/config'
import { clientRedis } from './config/redis'

const start = async () => {
  await connectToDatabase()
  await clientRedis.connect()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
