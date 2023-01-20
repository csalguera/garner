import { Profile } from "../models/profile.js";
import { Game } from '../models/game.js'
import { Platform } from '../models/platform.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'All Profiles'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Game.find({ owner: req.params.id })
    .populate('platforms')
    .then(games => {
      Platform.find({ _id: {$in: games.platforms} })
      .then(platforms => {
        res.render('profiles/show', {
          profile,
          games,
          platforms,
          title: `${profile.name}'s Collection`
        })
      })
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

export {
  index,
  show
}