import router from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../../db/models'
import { NODE_ENV, SECRET } from '../../config'
import { clientRedis } from '../../config/redis'
import { tokenExtractor } from '../middlewares'
import { Environment } from '../../types'

const route = router.Router()

route.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: { username },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!user) {
    return res.status(404).json({
      message: 'Username not found',
    })
  }
  if (!passwordCorrect) {
    return res.status(404).json({
      message: 'Password incorrect',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET as string)

  await clientRedis.set(
    token,
    JSON.stringify({ userId: String(user.id), token })
  )

  if (NODE_ENV === Environment.Development) {
    await clientRedis.expire(token, 3600)
  } else if (NODE_ENV === Environment.Production) {
    await clientRedis.expire(token, 3600 * 3)
  }

  return res
    .status(200)
    .send({ accessToken: token, username: user.username, userId: user.id })
})

route.get('/session', tokenExtractor, async (req, res) => {
  if (!req.decodedToken.token) res.status(401).end()
  await clientRedis.get(req.decodedToken.token)
  res.status(200).send(req.decodedToken)
})

route.delete('/logout/', tokenExtractor, async (req, res) => {
  if (!req.decodedToken.token) res.status(401).end()
  await clientRedis.del(req.decodedToken.token)
  res.status(200).send({ message: 'logout' })
})

export default route
