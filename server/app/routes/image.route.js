const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const fileUploader = require('../middlewares/image.middleware')
const courseController = require('../controllers/course.controller')
router.post('/uploadcourse',fileUploader.uploadCloudCourse.single('file'), (req, res, next) => {
  try{
    if (!req.file) {
      throw createError(403,'No file uploaded!');
    }
    res.status(200).json({ 
      'message':'oke',
      'isSuccess': true,
      'statusCode':200,
      'secure_url': req.file.path 
    });

  }catch (error) {
    console.log(error.message)
    next(error)
}
});

router.post('/uploadcavatar',fileUploader.uploadCloudAvatar.single('file'), (req, res, next) => {
  try{
    if (!req.file) {
      throw createError(403,'No file uploaded!');
    }
    res.status(200).json({ 
      'message':'oke',
      'isSuccess': true,
      'statusCode':200,
      'secure_url': req.file.path 
    });

  }catch (error) {
    console.log(error.message)
    next(error)
}
});
router.post('/uploadvideo',fileUploader.uploadCloudVideo.single('file'), (req, res, next) => {
  try{
    if (!req.file) {
      throw createError(403,'No file uploaded!');
    }
    res.status(200).json({ 
      'message':'oke',
      'isSuccess': true,
      'statusCode':200,
      'secure_url': req.file.path 
    });

  }catch (error) {
    console.log(error.message)
    next(error)
}
});


module.exports = router;