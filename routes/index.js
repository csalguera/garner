import { Router } from 'express'
import { Game } from '../models/game.js'
import { Platform } from '../models/platform.js'

const router = Router()

router.get('/', function (req, res) {
  Game.find({})
  .sort({ createdAt: 'desc' })
  .limit(8)
  .populate('platforms')
  .populate('owner')
  .then(games => {
    Platform.find({ _id: {$in: games.platforms} })
    .then(platforms => {
      res.render('index', {
        games,
        platforms,
        title: 'garner'
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})

export {
  router
}
