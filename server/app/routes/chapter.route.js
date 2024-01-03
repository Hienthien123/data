const express = require('express')
const router = express.Router()
const chapterController = require('../controllers/chapter.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware');
const redisMiddleware = require('../middlewares/redis.middleware');

router.post('/createchapter',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),chapterController.createChapter,redisMiddleware.setAllChapter)

router.post('/updatechapter',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),chapterController.updateChapter,redisMiddleware.setAllChapter)

router.post('/getbycourse',chapterController.getAllChapterByCourse)

router.post('/deletechapter',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),chapterController.deleteChapterById,redisMiddleware.setAllChapter)

router.post('/getChapterWithLesson',authMiddleware.checkToken,courseMiddleware.checkPayCreateAdmin,chapterController.getChapterWithLesson)

router.post('/getbyid',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),chapterController.getChapterById)




module.exports = router