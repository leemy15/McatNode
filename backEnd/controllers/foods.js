const foodsModel = require('../models/foodsModel.js')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

const findAll=async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let result = await foodsModel.findAll(req.query.id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        list:result,
        message: '当前小吃数据返回成功.',
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '当前小吃数据返回失败.'
      })
    })
  }
}
const foodsAdd = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let data = req.body
  console.log(data);
  data.foodsPic = req.filename
  let result = await foodsModel.save(data)
  
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '小吃信息添加成功.',
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '小吃信息添加失败.'
      })
    })
  }
}

// const updata = async function(req, res, next) {
//     res.set('Content-Type', 'application/json; charset=utf-8')
//     let data=req.body
//     if (req.filename === '') {
//       delete data.moviePic
//     } else {
//       data.moviePic = req.filename
//     }
    
//     let result = await hotmoviesModel.updata(data)
//     console.log(result);
//     if (result) {
//       res.render('succ', {
//         data: JSON.stringify({
//           message: '电影数据修改成功.',
//         })
//       })
//     } else {
//       res.render('fail', {
//         data: JSON.stringify({
//           message: '电影数据修改失败.'
//         })
//       })
//     }
//   }

// const findOne=async function(req, res, next) {
//   res.set('Content-Type', 'application/json; charset=utf-8')
//   let result = await hotmoviesModel.findOne(req.body.id)
//   if (result) {
//     res.render('succ', {
//       data: JSON.stringify({
//         list:result,
//         message: '当前电影数据返回成功.',
//       })
//     })
//   } else {
//     res.render('fail', {
//       data: JSON.stringify({
//         message: '当前电影数据返回失败.'
//       })
//     })
//   }
// }


const remove=async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let result = await foodsModel.remove(req.body.id)
  let foodsPic=req.body.foodsPic
  console.log(foodsPic);
  if (result) {
    fs.unlink(path.resolve(__dirname, '../public/foodsPic/' + foodsPic), (err) => {
      if (err) {
        console.log(err.message)
      }
    })
    res.render('succ', {
      data: JSON.stringify({
        message: '删除成功.',
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '删除失败.'
      })
    })
  }
}

// const search=async function(req, res, next) {
//   res.set('Content-Type', 'application/json; charset=utf-8')
//   let data = req.body
//   let result = await hotmoviesModel.search(data)
//   if (result) {
//     res.render('succ', {
//       data: JSON.stringify(result)
//     })
//   } else {
//     res.render('fail', {
//       data: JSON.stringify({
//         message: '搜索失败.'
//       })
//     })
//   }
// }





  module.exports = {
   // findAll,
   foodsAdd,
   findAll,
    // updata,
    // findOne,
   remove,
    // search
  }