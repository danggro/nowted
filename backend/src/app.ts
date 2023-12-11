import express from 'express'
const app = express()
import cors from 'cors'
import usersRouter from './api/routes/users'
import notesRouter from './api/routes/notes'
import authRouter from './api/routes/auth'

app.use(cors())
app.use(express.json())

app.use('/api/users/', usersRouter)
app.use('/api/notes/', notesRouter)
app.use('/api/auth/', authRouter)

export default app
