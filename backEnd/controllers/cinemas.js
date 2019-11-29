const cinemasModel = require('../models/cinemas.js')
const moment = require('moment')
// const fs = require('fs')
// const path = require('path')

const findAll =async (req, res, next) => {  
    res.set('Content-Type', 'application/json; charset=utf-8')
    let pageInfo = req.query
    let result=await cinemasModel.findAll(pageInfo)
    if (result) {
      res.render('succ', {
        data: JSON.stringify(result)
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({})
      })
    }
  }

  
  const cinemaAdd = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    let result = await cinemasModel.save(data)
    
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '影院信息添加成功.',
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '影院信息添加失败.'
        })
      })
    }
  }
  
const updata = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data=req.body    
    let result = await cinemasModel.updata(data)
    console.log(result);
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '电影数据修改成功.',
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '电影数据修改失败.'
        })
      })
    }
  }

const findOne=async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let result = await cinemasModel.findOne(req.body.id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        list:result,
        message: '当前电影数据返回成功.',
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '当前电影数据返回失败.'
      })
    })
  }
}


const remove=async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let {id} =req.body
  let result = await cinemasModel.remove(id)
  if (result) {
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
    cinemaAdd,
    findAll,
    remove,
    findOne,
    updata
  }