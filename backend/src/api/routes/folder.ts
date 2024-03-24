import router from 'express'
import { Folder } from '../../db/models'
import { tokenExtractor } from '../middlewares'

const route = router.Router()

route.post('/', tokenExtractor, async (req, res) => {
  const { userId } = req.decodedToken
  let { name } = req.body
  if (!name) name = 'New Folder'

  const folder = await Folder.create({ name, userId })
  res.status(201).json(folder)
})

route.get('/', tokenExtractor, async (req, res) => {
  const { userId } = req.decodedToken

  const folders = await Folder.findAll({ where: { userId } })
  res.status(201).json(folders)
})

route.delete('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params
  const folder = await Folder.findByPk(id)
  if (!folder) return res.status(404).end()

  if (req.decodedToken.userId !== folder.userId) {
    return res.status(401).json({ error: 'no authorization' })
  }

  await folder.destroy()
  return res.status(200).end()
})

export default route
