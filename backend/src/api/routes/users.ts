import router from 'express'
import { User, Note } from '../models'
import bcrypt from 'bcrypt'

const route = router.Router()

route.get('/', async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Note,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

route.post('/', async (req, res) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  const user = await User.create({ ...req.body, passwordHash })

  res.status(201).json({ username: user.username, email: user.email })
})

export default route
