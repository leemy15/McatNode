var express = require('express')
var router = express.Router()

const { signup, signin, hasUsername , isSignin ,loginOut} = require('../controllers/users')

router.post('/signup', hasUsername, signup)
router.post('/signin', signin)
router.get('/isSignin', isSignin)
router.get('/loginOut', loginOut)

module.exports = router
