const jwt = require('jsonwebtoken')
require('dotenv').config()
const createError = require('http-errors')
const User = require('../models/user.model')
const Payment = require('../models/payment.model')
const constant = require('../config/constant.config')
const Lesson = require('../models/lesson.model')
const Chapter = require('../models/chapter.model')
const Course = require('../models/course.model')
module.exports = {
    getAllUser: async (req, res, next) => {
        try{
            const redisClient = req.redisClient
            const data = await redisClient.get('getalluser')
            if(data&&data.length>0)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
    setAllUser: async (req, res, next) => {
        const redisClient = req.redisClient
        const data = await User.find({})
        await redisClient.set('getalluser',JSON.stringify(data))
        return res.status(200).json({
            'message':'oke',
            'isSuccess': true,
            'statusCode':200,
            'token': res.locals.newToken,

        })
    },
    getAllChapter: async (req, res, next) => {
        try{
            const redisClient = req.redisClient
            const data = await redisClient.get('getallchapter'+req.body._id)
            if(data)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    setAllChapter: async (course_id,req, res, next) => {
        try{
            // console.log(chapter)
            const data = await Chapter.find({course_id: course_id.course_id,isDelete:false})
            const redisClient = req.redisClient
            await redisClient.set('getallchapter'+course_id.course_id,JSON.stringify(data))
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
    getAllCourse: async (req, res, next) => {
        try{
            
            const redisClient = req.redisClient
            const data = await redisClient.get('getallcourse')
            
            if(data&&data.length>0)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
    setAllCourse: async(req,res,next)=>{
        try{
            // console.log(chapter)
            const data = await Course.find({isDelete:false})
            const redisClient = req.redisClient
            await redisClient.set('getallcourse',JSON.stringify(data))
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
    getAllLesson: async (req, res, next) => {
        try{
            const redisClient = req.redisClient
            const data = await redisClient.get('getalllesson'+req.body._id)
            if(data)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
    getAllPayment: async (req, res, next) => {
        try{
            const redisClient = req.redisClient
            const data = await redisClient.get('getallpayment')
            if(data)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
    getAllReview: async (req, res, next) => {
        try{
            const redisClient = req.redisClient
            const data = await redisClient.get('getallreview')
            if(data)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
    getAllTopic: async (req, res, next) => {
        try{
            const redisClient = req.redisClient
            const data = await redisClient.get('getalltopic')
            if(data)
            return res.status(200).json({
                'message':'oke',
                'result': data,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
}