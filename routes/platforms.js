import { Router } from 'express'
import * as platformsCtrl from '../controllers/platforms.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', platformsCtrl.index)
router.get('/new', platformsCtrl.new)
router.get('/:id', platformsCtrl.show)
router.post('/', isLoggedIn,platformsCtrl.create)

export {
  router
}
