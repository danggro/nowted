import router from 'express'
import { User, Note } from '../../db/models'

const route = router.Router()

route.post('/reset', async (_req, res) => {
  await Note.destroy({ where: {} })
  await User.destroy({ where: {} })
  res.status(200).end()
})

export default route
