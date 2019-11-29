const { Cinemas } = require('../utils/db')

const save = (data) => {
    const cinemas = new Cinemas(data)
    return cinemas.save()
} 
const findAll = async ({start, count}) => {
    let list = await Cinemas.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
    let total = await Cinemas.find({}).count()
    return {
      list,
      total
    }
  }
  const remove = async (id) => {
    return await Cinemas.findByIdAndDelete(id)
  }
  const findOne = async (id) => {
    return await Cinemas.findById(id)
  }
  const updata=async(data) =>{
    console.log(data);
    return await Cinemas.findByIdAndUpdate(data.id, data)
  }

module.exports = {
    save,
    findAll,
    remove,
    findOne,
    updata
}