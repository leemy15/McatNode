var express = require('express')
var router = express.Router()

let hotmovies = require('../controllers/hotmovies')
let authLoadingPic = require('../middlewares/loadPic')

// router.get('/findAll', hotmovies.findAll)
// router.post('/add', hotmovies.hotmovieAdd)

router.route('/')
    .get(hotmovies.findAll)
    .post(authLoadingPic,hotmovies.hotmovieAdd)
    .delete(hotmovies.remove)
    
router.post('/findOne',hotmovies.findOne)  
router.post('/search',hotmovies.search)  
router.post('/put',authLoadingPic,hotmovies.updata)  




module.exports = router
