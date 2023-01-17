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

function create(req, res) {
  console.log('test');
}

export {
  index,
  create
}