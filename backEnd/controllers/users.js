const usersModel = require('../models/users')
const tools = require('../utils/tools')
const authMiddleware = require('../middlewares/auth')

const signup = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')

  let { username, password,tel,email} = req.body

  let hash = tools.hash(password)

  let result = await usersModel.save({
    username,
    password: hash,
    tel,
    email
  })
  
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '用户注册成功.',
        username
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户注册失败.'
      })
    })
  }
}

const hasUsername = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { username } = req.body
  let result = await usersModel.findOne({username})
  if (result) {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名已经存在.'
      })
    })
  } else {
    next()
  }
}

const signin = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { username, password } = req.body

  let result = await usersModel.findOne({username})

  if (result) {
    let compareResult = await tools.compare(password, result.password)
    if (compareResult) {
      let token = await tools.generateToken(username)
      req.session.username = username
      res.header('X-Access-Token', token)
      res.render('succ', {
        data: JSON.stringify({
          type: 'signin',
          username, 
          message: '用户登录成功.',
          isSignin:true
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名或密码不正确.'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名或密码不正确.'
      })
    })
  }
}

  const isSignin = authMiddleware



  const loginOut = function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    req.session = null
    res.render('succ', {
      data: JSON.stringify({
        message: '注销成功'
      })
    })
  }

module.exports = {
  signup,
  hasUsername,
  signin,
  loginOut,
  isSignin
}