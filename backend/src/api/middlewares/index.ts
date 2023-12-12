import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'sequelize'

import { SECRET } from '../../config/config'
import jwt, { GetPublicKeyOrSecret, JwtPayload, Secret } from 'jsonwebtoken'
import { getSession } from '../../utils/utils'

const tokenExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'token missing' })

  const session = await getSession(authorization.substring(7))

  if (session) {
    try {
      const jwtResult = jwt.verify(
        authorization.substring(7),
        SECRET as Secret | GetPublicKeyOrSecret
      ) as unknown as JwtPayload
      req.decodedToken = {
        username: jwtResult.username,
        userId: jwtResult.id,
        token: session.token,
      }
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'session expired' })
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
  const err = e as ValidationError
  const error = err.errors[0]

  if (error.validatorName === 'notEmpty' || error.validatorName === null) {
    if (error.path === 'username')
      res.status(400).send({ error: `${error.path} empty` })
    if (error.path === 'email')
      res.status(400).send({ error: `${error.path} empty` })
    if (error.path === 'password')
      res.status(400).send({ error: `${error.path} empty` })
  }

  next(error)
}

export { tokenExtractor, errorHandler }
