const mongoose = require('mongoose');
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware');
const { getAllCourse } = require('../middlewares/redis.middleware');
const redisMiddleware = require('../middlewares/redis.middleware');
const fileUploader = require('../middlewares/image.middleware');
const { route } = require('./image.route');


router.post('/createcourse',authMiddleware.checkToken,authMiddleware.checkRole(constant.instructorRole),courseController.createCourse,redisMiddleware.setAllCourse)

router.post('/getcoursebyidadmin',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),courseController.getCourseById)

router.post('/updatecourse',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),courseController.changeCourse,redisMiddleware.setAllCourse)

router.post('/deletecourse',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole), courseController.deleteCourse,redisMiddleware.setAllCourse)

router.post('/getallcoursebyauthor', courseController.getAllCourseByAuthor)

router.post('/getallcoursebytag', courseController.getAllCourseByTag)

router.post('/getallcoursebycategory', courseController.getAllCourseByCategory)

router.post('/searchcoursebykeyword', courseController.searchCourseByKeyword)

router.post('/getfullcoursebyid',authMiddleware.checkToken,courseMiddleware.checkPayCreateAdmin,courseController.getFullCourseData)

router.post('/getallcourse',courseController.getAllCourse)

router.post('/getallcourseadmin',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),redisMiddleware.getAllCourse,courseController.getAllCourseAdmin)

router.post('/getbyiduser',courseController.getCourseById)



module.exports = router

