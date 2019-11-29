const path = require('path')
const multer = require('multer')
const randomstring = require('randomstring')
const fs = require('fs')

var filename = ''

const mimetypeMap = {
  'image/png': '.png',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/gif': '.gif'
}

const storage = multer.diskStorage({
    
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/MoviePic'))
  },

  filename: (req, file, cb) => {
    let { fieldname, mimetype } = file
    filename = fieldname + '-' + randomstring.generate(10) + mimetypeMap[mimetype]
    cb(null, filename)
  }
})

 
  
const upload = multer({
  storage
}).single('moviePic')

// module.exports = ((req, res, next) => {
//   return upload.single('companyLogo')
// })()

module.exports = (req, res, next) => {
  
  upload(req, res, (err) => {
    console.log(req.body);
    if (filename) {
      fs.unlink(path.resolve(__dirname, '../public/MoviePic/' + req.body.oldPicName), (err) => {
        if (err) {
          console.log(err.message)
        }
      })
    }
    req.filename = filename
    next()
  })
}