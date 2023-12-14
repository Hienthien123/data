require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Payment = require("../models/payment.model")
const Course = require("../models/course.model")
const User = require("../models/user.model")
module.exports = {
    create: async (req, res, next) => {
        try{
            const course = await Course.findById(req.body.course_id)
            if(!course || course.isDelete) 
            throw createError(400,'this course does not exist')
            const payment = new Payment()
            payment.user_id = res.locals.userInfo._id
            payment.total = course.price
            payment.course_id = course._id
            await payment.save()
            return res.status(200).json({
               'message': 'oke',
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    read: async (req,res,next)=>{
        try{
            const payments = await Payment.find({})
            .populate({
                path: 'user_id',
                select: 'username',
            })
            .populate({
                path: 'course_id',
                select: 'title',
            })
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': payments,
             })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req, res,next)=>{
        try{
            const x = await Payment.findByIdAndDelete(req.body._id)
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
             }) 

        }catch (error) {
            console.log(error.message)
            next(error)
        }

    },
    // getAll: async(req, res, next)=>{

    // }
}