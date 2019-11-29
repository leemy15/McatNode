var express = require('express')
var router = express.Router()

let foods = require('../controllers/foods')
let foodsPic = require('../middlewares/foodsPic')
//let authLoadingPic = require('../middlewares/loadPic')

// router.get('/findAll', hotmovies.findAll)
// router.post('/add', hotmovies.hotmovieAdd)

router.route('/')
    .get(foods.findAll)
    .post(foodsPic,foods.foodsAdd)
    .delete(foods.remove)
    
 //router.post('/findOne',foods.findOne)  
 //router.post('/add',hotmovies.search)  
 //router.post('/updata',foods.updata)  

module.exports = router
