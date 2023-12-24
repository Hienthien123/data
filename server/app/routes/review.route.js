const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config')
const courseMiddleware = require('../middlewares/course.middleware')


router.post('/read',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.read)

router.post('/getbyid',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.getById)

router.post('/create',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.create)

router.post('/update',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.update)

router.post('/delete',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),reviewController.delete)

module.exports = router