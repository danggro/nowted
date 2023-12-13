import express from 'express'
import 'express-async-errors'
const app = express()
import cors from 'cors'
import usersRouter from './api/routes/users'
import notesRouter from './api/routes/notes'
import authRouter from './api/routes/auth'
import { errorHandler } from './api/middlewares'

app.use(cors())
app.use(express.json())

app.use('/api/users/', usersRouter)
app.use('/api/notes/', notesRouter)
app.use('/api/auth/', authRouter)
app.use(errorHandler)

export default app