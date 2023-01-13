import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

router.get('/', gamesCtrl.index)
router.get('/new', gamesCtrl.new)
router.post('/', gamesCtrl.create)

export {
  router
}
