import { Game } from "../models/game.js"

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render('games/index', {
      games,
      title: 'All Games'
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

function create(req, res) {
  Game.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    res.render('games/show', {
      game,
      title: `${game.name}`
    })
  })
    .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  newGame as new,
  create,
  show
}