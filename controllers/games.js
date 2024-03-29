import { Game } from "../models/game.js"
import { Platform } from "../models/platform.js"

function index(req, res) {
  Game.find({})
  .sort({ name: 'asc' })
  .populate('platforms')
  .populate('owner')
  .then(games => {
    Platform.find({ _id: {$in: games.platforms} })
    .then(platforms => {
      res.render('games/index', {
        games,
        platforms,
        title: 'All Games'
      })
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
  req.body.owner = req.user.profile._id
  Game.create(req.body)
  .then(game => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Game.findById(req.params.id)
  .populate('owner')
  .populate('comments.commenter')
  .populate('platforms')
  .then(game => {
    Platform.find({ _id: {$nin: game.platforms} })
    .then(gamePlatforms => {
      res.render('games/show', {
        game,
        gamePlatforms,
        title: `${game.name}`
      })
    })
  })
    .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    res.render(`games/edit`, {
      game,
      title: 'Edit Game'
    })
  })
    .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)) {
      game.updateOne(req.body)
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error('You are not authorized to edit this game')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteGame(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)) {
      game.delete()
      .then(() => {
        res.redirect('/games')
      })
    } else {
      throw new Error('You are not authorized to delete this game')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createComment(req, res) {
  req.body.commenter = req.user.profile._id
  Game.findById(req.params.id)
  .then(game => {
    game.comments.push(req.body)
    game.save()
    .then(() => {
      res.redirect(`/games/${game._id}`)
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
}

function editComment(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    console.log(game);
    let comment = game.comments.id(req.params.comId)
    res.render('games/edit', {
      game,
      comment,
      title: 'Edit Comment'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updateComment(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    let comment = game.comments.id(req.params.comId)
    if (comment.commenter.equals(req.user.profile._id)) {
      comment.set(req.body)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error('You are not authorized to edit this comment')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteComment(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    if (game.comments.id(req.params.comId).commenter.equals(req.user.profile._id)) {
      game.comments.id(req.params.comId).remove()
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error('You are not authorized to delete this comment')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addPlatform(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    game.platforms.push(req.body.platformId)
    game.save()
    .then(() => {
      res.redirect(`/games/${game._id}`)
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
}

function removePlatform(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)) {
      game.platforms.pull(req.params.pId)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error('You are not authorized to remove this platform')
    }
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
  show,
  edit,
  update,
  deleteGame as delete,
  createComment,
  editComment,
  updateComment,
  deleteComment,
  addPlatform,
  removePlatform,
}