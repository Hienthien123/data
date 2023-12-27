require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Payment = require("../models/payment.model")
const Course = require("../models/course.model")
const User = require("../models/user.model")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
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
            // console.log(course.price)
            console.log("hi")
            await payment.save()
            const data = [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: course.title,
                          },
                          unit_amount: course.price,
                    },
                    quantity : 1
                }
            ]
            // console.log(data)
            let hash = await bcrypt.hash(payment._id + process.env.APP_SECRET,10)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: data,
                success_url: `${process.env.CLIENT_URL}/website/payment/success/${payment._id}/${hash}`,
                cancel_url: `${process.env.CLIENT_URL}/website/payment/`,
              })
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': session.url,
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    confirmPayment: async(req, res, next) => {
        try{
            const payment = await Payment.findById(req.body._id)
            if(!payment)
                throw createError(403,"Payment not found")
            if(payment.user_id!==res.locals.userInfo._id)
                throw createError(403,"something went wrong")
            const hash = bcrypt.hash(payment._id+process.env.APP_SECRET)
            if(hash!==req.body.hash)
            throw createError(403,"Your are not pay yet")
            payment.status = true
            await payment.save()
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
}