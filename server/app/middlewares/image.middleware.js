const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const constant = require('../config/constant.config')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storageAvatar = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png','jpeg'],
  params:{
    folder: 'avatar'
  }
});
const storageCourse = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png','jpeg'],
  params:{
    folder: 'course'
  }
});

const storageVideo = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['mp4'],
  params:{
    folder: 'video'
  }
})



function checkAuthAndRollAdmin(fields){
  try{
    
  const authHeader = fields.authorization
  if (!authHeader)
    return false
  const token = authHeader.split(" ")[1]
  jwt.verify(token, process.env.APP_SECRET,  (err, decoded) => {
    // console.log("this")
    if (err) 
        throw err
    listRole = decoded.roles.split(',')
    // console.log(listRole)
    if(listRole.includes(constant.adminRole))
      return true
    else return false
  })
  // console.log("this")
  return true

  }catch{
    return false
  }
}

function checkAuthAndRollUser(fields){
  try{
    
  const authHeader = fields.authorization
  if (!authHeader)
    return false
  const token = authHeader.split(" ")[1]
  jwt.verify(token, process.env.APP_SECRET,  (err, decoded) => {
    if (err) 
        throw err
    listRole = decoded.roles.split(',')
    if(listRole.includes(constant.userRole))
      return true
    else return false
  })
  return true

  }catch{
    return false
  }
}


const uploadCloudAvatar = multer({ 
  
  fileFilter: (req,file,cb)=>{
    cb(null,checkAuthAndRollAdmin(req.body))
  },
  storage:storageAvatar,
});

const uploadCloudCourse = multer({ 
  fileFilter: (req,file,cb)=>{
    cb(null,checkAuthAndRollAdmin(req.body))
  },
  storage:storageCourse,
});


const uploadCloudVideo = multer({storage:storageVideo})




module.exports = {
  uploadCloudAvatar,
  uploadCloudCourse,
  uploadCloudVideo,
}