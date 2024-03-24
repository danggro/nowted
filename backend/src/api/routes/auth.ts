import router from 'express'
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'
import { User } from '../../db/models'
import { NODE_ENV } from '../../config'
import { clientRedis } from '../../config/redis'
import { tokenExtractor } from '../middlewares'
import { Environment } from '../../types'

const route = router.Router()

route.post('/login', async (req, res) => {
  const { username, password } = req.body

  const authError = {
    username: '',
    password: '',
  }

  const user = await User.findOne({
    where: { username },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!user || !passwordCorrect) {
    if (!user) {
      authError.username = 'Username not found'
    }
    if (!passwordCorrect) {
      authError.password = 'Password incorrect'
    }
    return res.status(404).send(authError)
  }

  const token = randomstring.generate(16)

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

route.delete('/logout', tokenExtractor, async (req, res) => {
  if (!req.decodedToken.token) res.status(401).end()
  await clientRedis.del(req.decodedToken.token)
  res.status(200).send({ message: 'logout' })
})

export default route
