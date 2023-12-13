import app from './app'

import { connectToDatabase } from './db/'
import { PORT } from './config'
import { clientRedis } from './config/redis'

const start = async () => {
  await connectToDatabase()
  await clientRedis.connect()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
