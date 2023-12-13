import router from 'express'
import { User, Note } from '../../db/models'
import bcrypt from 'bcrypt'

const route = router.Router()

route.get('/', async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: {
      model: Note,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

route.get('/:id', async (req, res) => {
  const { id } = req.params
  const users = await User.findByPk(id, {
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
  let passwordHash
  if (req.body.password === '') {
    passwordHash = ''
  } else {
    passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  }
  const user = await User.create({ ...req.body, password: passwordHash })
  res
    .status(201)
    .json({ id: user.id, username: user.username, email: user.email })
})

export default route
