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

export default route
