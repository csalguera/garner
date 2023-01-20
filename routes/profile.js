import { Router } from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import { Game } from "../models/game.js";
import { Platform } from "../models/platform.js";

const router = Router()

router.get('/', isLoggedIn, function (req, res) {
  Game.find({ owner: req.user.profile._id })
  .sort({ name: 'asc' })
  .populate('platforms')
  .then(games => {
    Platform.find({ _id: {$in: games.platforms} })
    .then(platforms => {
      res.render('profile', {
        games,
        platforms,
        title: 'My Profile'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
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