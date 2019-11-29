const { Hotmovies } = require('../utils/db')

const save = (data) => {
    const hotmovies = new Hotmovies(data)
    return hotmovies.save()
} 

const findAll = async ({start, count}) => {
  let list = await Hotmovies.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
  let total = await Hotmovies.find({}).count()
  return {
    list,
    total
  }
}

const updata=async(data) =>{
  console.log(data);
  return await Hotmovies.findByIdAndUpdate(data.id, data)
}

const findOne = async (id) => {
  return await Hotmovies.findById(id)
}

const remove = async (id) => {
  return await Hotmovies.findByIdAndDelete(id)
}

const search = async ({keywords,start, count}) => {
  let reg = new RegExp(keywords, 'gi')
  let list =  await Hotmovies.find({}).sort({_id: -1}).or([{ movieName: reg }, { movieStart: reg },{ movieType:reg },{movieId:reg}])
  let total = await Hotmovies.find({}).limit(~~count).skip(~~start).count()
  return {
    list,
    total
  }
}

 module.exports = {
    save,
    findAll,
    updata,
    findOne,
    remove,
    search
  }