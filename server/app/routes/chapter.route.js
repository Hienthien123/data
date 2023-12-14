const express = require('express')
const router = express.Router()
const chapterController = require('../controllers/chapter.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware');

router.post('/createchapter',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),chapterController.createChapter)

router.post('/updatechapter',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),chapterController.updateChapter)

router.post('/getbycourse',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),chapterController.getAllChapterByCourse)

router.post('/deletechapter',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),chapterController.deleteChapterById)

router.post('/getChapterWithLesson',authMiddleware.checkToken(constant.timeExpire),courseMiddleware.checkPayCreateAdmin,chapterController.getChapterWithLesson)

router.post('/getbyid',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.adminRole),chapterController.getChapterById)


module.exports = router