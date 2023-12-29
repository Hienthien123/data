const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config')
const courseMiddleware = require('../middlewares/course.middleware')


router.post('/read',reviewController.read)

router.post('/getbyid',reviewController.getById)

router.post('/create',authMiddleware.checkToken,authMiddleware.checkRole(constant.userRole),reviewController.create)

router.post('/update',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.update)

router.post('/delete',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.delete)


module.exports = router