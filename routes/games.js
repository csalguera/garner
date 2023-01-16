import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /games
router.get('/', gamesCtrl.index)
// GET /games/new
router.get('/new', gamesCtrl.new)
// GET /games/:id
router.get('/:id', gamesCtrl.show)
// GET /games/:id/edit
router.get('/:id/edit', isLoggedIn, gamesCtrl.edit)
// GET /games/:id/comments/:id/edit
router.get('/:id/comments/:comId/edit', isLoggedIn, gamesCtrl.editComment)
// POST /games
router.post('/', isLoggedIn, gamesCtrl.create)
// POST /games/:id/comments
router.post('/:id/comments', isLoggedIn, gamesCtrl.createComment)
// PUT /games/:id
router.put('/:id', isLoggedIn, gamesCtrl.update)
// PUT /games/:id/comments/:id
router.put('/:id/comments/:comId', isLoggedIn, gamesCtrl.updateComment)
// DELETE /games/:id
router.delete('/:id', isLoggedIn, gamesCtrl.delete)
// DELETE /games/:id/comments/:id
router.delete('/:id/comments/:comId', isLoggedIn, gamesCtrl.deleteComment)

export {
  router
}
