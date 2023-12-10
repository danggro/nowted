import express from 'express'
const app = express()
import cors from 'cors'
import 'dotenv/config'
app.use(cors())
app.use(express.json())
import { connectToDatabase } from './config/db'
import env from './config/config'
const add = (a: number, b: number): number => a + b

app.get('/', (_req, res) => {
  const a = 2
  const b = 2
  const result = add(a, b)
  res.json({ message: `${a} plus ${b} is ${result}` })
})

const start = async () => {
  await connectToDatabase()
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
  })
}

start()
