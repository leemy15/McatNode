var express = require('express')
var router = express.Router()

let cinemas = require('../controllers/cinemas')
//let authLoadingPic = require('../middlewares/loadPic')

// router.get('/findAll', hotmovies.findAll)
// router.post('/add', hotmovies.hotmovieAdd)

router.route('/')
    .get(cinemas.findAll)
    .post(cinemas.cinemaAdd)
    .delete(cinemas.remove)
    
 router.post('/findOne',cinemas.findOne)  
// router.post('/search',hotmovies.search)  
 router.post('/updata',cinemas.updata)  




module.exports = router
