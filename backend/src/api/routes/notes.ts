import router from 'express'
import { User, Note } from '../models'

const route = router.Router()

route.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const where = {
    userId,
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    where,
    include: {
      model: User,
      attributes: ['username'],
    },
  })
  res.json(notes)
})

route.post('/', async (req, res) => {
  const blog = await Note.create({ ...req.body })
  res.json(blog)
})

export default route
