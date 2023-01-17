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

function edit(req, res) {
  Platform.findById(req.params.id)
  .then(platform => {
    res.render(`platforms/edit`, {
      platform,
      title: 'Edit Platform'
    })
  })
    .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Platform.findById(req.params.id)
  .then(platform => {
    if (platform.owner.equals(req.user.profile._id)) {
      platform.updateOne(req.body)
      .then(() => {
        res.redirect(`/platforms/${platform._id}`)
      })
    } else {
      throw new Error('You are not authorized to edit this platform')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deletePlatform(req, res) {
  Platform.findById(req.params.id)
  .then(platform => {
    if (platform.owner.equals(req.user.profile._id)) {
      platform.delete()
      .then(() => {
        res.redirect('/platforms')
      })
    } else {
      throw new Error('You are not authorized to delete this platform')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  newPlatform as new,
  create,
  show,
  edit,
  update,
  deletePlatform as delete
}