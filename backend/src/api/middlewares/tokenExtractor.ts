import { NextFunction, Request, Response } from 'express'
import { clientRedis } from '../../config/redis'
import { User } from '../../types/types'

const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')

interface CustomRequest extends Request {
  decodedToken: User
}

const tokenExtractor = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'token missing' })

  const session = await clientRedis.get(authorization.substring(7))

  if (session) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  }

  return next()
}

module.exports = { tokenExtractor }
