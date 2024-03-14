import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import { getSession } from '../../utils/utils'

const tokenExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ message: 'token missing' })

  const session = await getSession(authorization.substring(7))

  if (session) {
    try {
      req.decodedToken = {
        username: session.username,
        userId: Number(session.userId),
        token: session.token,
      }
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'session expired' })
    }
  }

  return next()
}

const errorHandler = (
  e: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { errors } = e as ValidationError
  const err = e as Error

  const authError = {
    username: '',
    email: '',
    password: '',
  }

  const noteError = {
    title: '',
    date: '',
  }

  if (err.message.includes('No session')) {
    res.status(401).send({ message: `${err.message}` })
  }

  if (!errors) return null
  errors.forEach((error) => {
    if (
      error.path === 'username' ||
      error.path === 'email' ||
      error.path === 'password'
    ) {
      authError[error.path] = error.message
    }
    if (error.path === 'title' || error.path === 'date') {
      noteError[error.path] = error.message
    }
  })

  if (authError.username || authError.email || authError.password) {
    res.status(400).send(authError)
  }

  if (noteError.title || noteError.date) {
    res.status(400).send(noteError)
  }

  if (errors[0].validatorKey === 'isDateFormat') {
    res.status(400).send({ message: `${errors[0].message}` })
  }

  return next(e)
}

export { tokenExtractor, errorHandler }
