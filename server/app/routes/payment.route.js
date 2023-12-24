const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const paymentMiddleware = require('../middlewares/payment.middleware')

router.post('/create',authMiddleware.checkToken,paymentController.create)

router.post('/read',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),paymentController.read)


router.post('/delete',authMiddleware.checkToken,authMiddleware.checkRole(constant.adminRole),paymentController.delete)

router.post('/confirm',authMiddleware.checkToken,paymentController.confirmPayment)


module.exports = router