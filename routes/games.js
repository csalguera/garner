import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', gamesCtrl.index)
router.get('/new', gamesCtrl.new)
router.get('/:id', gamesCtrl.show)
router.get('/:id/edit', isLoggedIn, gamesCtrl.edit)
router.post('/', isLoggedIn, gamesCtrl.create)
router.post('/:id/comments', isLoggedIn, gamesCtrl.createComment)
router.put('/:id', isLoggedIn, gamesCtrl.update)
router.delete('/:id', isLoggedIn, gamesCtrl.delete)

export {
  router
}
