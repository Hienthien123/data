const mongoose = require('mongoose');
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const redisMiddelware = require('../middlewares/redis.middleware')

router.post('/profilechange',authMiddleware.checkToken,authMiddleware.checkRole(constant.userRole), userController.changeProfile)

router.post('/getuserbyid',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole), userController.getUserById)

router.post('/getuserbyusername',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole), userController.getUserByUsername)

router.post('/disableuser',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),userController.disableUser,redisMiddelware.setAllUser)

router.post('/getalluser',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),redisMiddelware.getAllUser, userController.getAllUser)

router.post('/changeuserinfo',authMiddleware.checkToken, userController.changeUserInfo)

module.exports = router