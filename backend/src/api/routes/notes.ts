import router from 'express'
import { User, Note } from '../../db/models'
import { tokenExtractor } from '../middlewares'
import { getDefaultDate } from '../../utils/utils'

const route = router.Router()

route.get('/', tokenExtractor, async (req, res) => {
  const { userId } = req.decodedToken
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

route.post('/', tokenExtractor, async (req, res) => {
  const { userId } = req.decodedToken
  let date: string

  req.body.date === '' ? (date = getDefaultDate()) : (date = req.body.date)

  const note = await Note.create({ ...req.body, date, userId })
  res.status(201).json(note)
})

route.put('/', tokenExtractor, async (req, res) => {
  const { id } = req.body
  let date: string

  req.body.date === '' ? (date = getDefaultDate()) : (date = req.body.date)

  const note = await Note.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username'],
    },
  })

  if (note !== null) {
    note.title = req.body.title
    note.date = date
    note.content = req.body.content
    note.folderId = req.body.folderId
    note.favorite = req.body.favorite
    note.archived = req.body.archived
    await note.save()
    res.status(200).json(note)
  } else {
    res.status(404).end()
  }
})

route.put('/movetofolder/', async (req, res) => {
  const { fromId, toId } = req.body
  const notes = await Note.findAll({ where: { folderId: fromId } })

  notes.forEach(async (note) => {
    note.folderId = toId
    await note.save()
  })

  res.status(200).json(notes.map((note) => note.folderId))
})

route.delete('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params
  const note = await Note.findByPk(id)
  if (!note) return res.status(404).end()

  if (req.decodedToken.userId !== note.userId) {
    return res.status(401).json({ error: 'no authorization' })
  }

  await note.destroy()
  return res.status(200).end()
})

export default route
