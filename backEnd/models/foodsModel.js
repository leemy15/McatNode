const { Foods } = require('../utils/db')

const save = (data) => {
    const foods = new Foods(data)
    return foods.save()
} 

 const findAll = async (Id) => {
   return await Foods.find({}).or({ cinemaId: Id })
 }

// const updata=async(data) =>{
//   console.log(data);
//   return await Hotmovies.findByIdAndUpdate(data.id, data)
// }

// const findOne = async (id) => {
//   return await Hotmovies.findById(id)
// }

const remove = async (id) => {
  return await Foods.findByIdAndDelete(id)
}

// const search = async ({keywords,start, count}) => {
//   let reg = new RegExp(keywords, 'gi')
//   let list =  await Hotmovies.find({}).sort({_id: -1}).or([{ movieName: reg }, { movieStart: reg },{ movieType:reg },{movieId:reg}])
//   let total = await Hotmovies.find({}).limit(~~count).skip(~~start).count()
//   return {
//     list,
//     total
//   }
// }

 module.exports = {
    save,
    findAll,
    // findAll,
    // updata,
    // findOne,
     remove,
    // search
  }