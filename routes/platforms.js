import { Router } from 'express'
import * as platformsCtrl from '../controllers/platforms.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', platformsCtrl.index)
router.get('/new', platformsCtrl.new)
router.get('/:id', platformsCtrl.show)
router.get('/:id/edit', isLoggedIn,platformsCtrl.edit)
router.post('/', isLoggedIn,platformsCtrl.create)
router.put('/:id', isLoggedIn, platformsCtrl.update)
router.delete('/:id',isLoggedIn, platformsCtrl.delete)

export {
  router
}
