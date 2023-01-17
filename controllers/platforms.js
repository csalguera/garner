import { Platform } from "../models/platform.js"

function index(req, res) {
  Platform.find({})
  .then(platforms => {
    res.render('platforms/index', {
      platforms,
      title: 'All Platforms'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

function newPlatform(req, res) {
  res.render('platforms/new', {
    title: 'Add Platform'
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Platform.create(req.body)
  .then(platform => {
    res.redirect('/platforms')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

function show(req, res) {
  Platform.findById(req.params.id)
  .populate('owner')
  .then(platform => {
    res.render('platforms/show', {
      platform,
      title: `${platform.name}`
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

export {
  index,
  newPlatform as new,
  create,
  show
}