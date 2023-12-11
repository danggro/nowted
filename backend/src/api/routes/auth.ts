import router from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models'
import { SECRET } from '../../config/config'
import { clientRedis } from '../../config/redis'

const route = router.Router()

route.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: { username },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
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

  await clientRedis.expire(token, 3600 * 3)
  return res
    .status(200)
    .send({ token, username: user.username, userId: user.id })
})

// route.delete('/logout/:id', async (req, res) => {
//   const { id } = req.params
//   await clientRedis.del(id)
//   res.status(200).send({ message: 'logout' })
// })

export default route
