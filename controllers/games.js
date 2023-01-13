import { Game } from "../models/game.js"

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render('games/index', {
      games,
      title: 'Games'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newGame(req, res) {
  res.render('games/new', {
    title: 'Add Game'
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  newGame as new
}