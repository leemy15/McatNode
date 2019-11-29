const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Mcat-admin', { useUnifiedTopology: true, useNewUrlParser: true })

const Users = mongoose.model('users', {
  username: String,
  password: String,
  tel:String,
  email:String
})

const Hotmovies = mongoose.model('hotmovies', {
  movieId:String,
  movieName: String,
  movieStart:String,
  showTime:String,
  movieType:String,
  version:String,
  moviePic:String,
  createTime:String,
  detail:String,
  publisher:String
})
const Cinemas = mongoose.model('cinemas', {
  cinemaId:String,
  cinemaName:String,
  cinemaArr:String,
  specall:String,
  createTime:String,
  City:String,
 
})

const Foods = mongoose.model('foods', {
  foodsId:String,
  foodsName:String,
  foodsDetail:String,
  foodsManey:String,
  foodsPic:String,
  createTime:String,
  cinemaId:String
})


module.exports = {
  Users,
  Hotmovies,
  Cinemas,
  Foods
}