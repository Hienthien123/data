const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lesson.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware')

router.post('/createlesson',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),lessonController.create)

router.post('/updatelesson',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),lessonController.change)

router.post('/deletelesson',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),lessonController.delete)

router.post('/getbyid',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),lessonController.getById)

router.post('/getbychapter',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),lessonController.getByChapterId)



module.exports = router