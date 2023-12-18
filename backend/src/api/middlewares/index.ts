import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'sequelize'

import { SECRET } from '../../config'
import jwt, { GetPublicKeyOrSecret, JwtPayload, Secret } from 'jsonwebtoken'
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
  console.log(e)

  if (err.message.includes('No session'))
    res.status(401).send({ message: `${err.message}` })
  if (
    errors[0].validatorKey === 'notEmpty' ||
    errors[0].validatorKey === null
  ) {
    if (errors[0].path === 'username')
      res.status(400).send({ message: `${errors[0].path} empty` })
    if (errors[0].path === 'email')
      res.status(400).send({ message: `${errors[0].path} empty` })
    if (errors[0].path === 'password')
      res.status(400).send({ message: `${errors[0].path} empty` })
    if (errors[0].path === 'title')
      res.status(400).send({ message: `${errors[0].path} empty` })
    if (errors[0].path === 'date')
      res.status(400).send({ message: `${errors[0].path} empty` })
  }
  if (errors[0].validatorKey === 'isDateFormat')
    res.status(400).send({ message: `${errors[0].message}` })

  res.status(400).send({ message: errors[0].message })
  next(e)
}

export { tokenExtractor, errorHandler }
