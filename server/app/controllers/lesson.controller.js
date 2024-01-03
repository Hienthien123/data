require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Lesson = require("../models/lesson.model")
const Chapter = require("../models/chapter.model")
const Payment = require('../models/payment.model')

module.exports = {
    create : async (req,res,next) =>{
        try {
            const request = req.body.change
            delete request._id
            const lesson = new Lesson(request)
            if(lesson===null)
                throw createError(400,'create fail')
            await lesson.save()
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    change: async(req,res,next) => {
        try{
            const lesson = await Lesson.findById(req.body.change._id)
            if(!lesson)
                throw createError(400,'something went wrong')
            Object.assign(lesson,req.body.change)
            await lesson.save()
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
               'statusCode':200,
                'token': res.locals.newToken,
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req,res,next) => {
        try{
            await Lesson.updateOne({_id:req.body._id},{isDelete: true})
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
            next()
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getById: async(req, res, next) => {
        try{
            const lesson = await Lesson.findById(req.body._id)
            .where({ isDelete: false })
            if(!lesson)
                createError(400,'This lesson is not exist')
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': lesson,
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getByChapterId: async(req, res, next) => {
        try{
            const lessons = await Lesson.find({chapter_id:req.body._id,isDelete:false})
            // console.log(res.locals.newToken)
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': lessons,
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getByUser: async(req, res, next) => {
        try{
            const lessons = await Lesson.find({chapter_id:req.body._id,isDelete:false},{ link: 0 })
            console.log(lessons)
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': lessons,
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    learn: async(req, res, next) => {
        try{
            console.log(req.body)
            console.log(res.locals.userInfo._id)
            const payment = await Payment.find({"user_id":res.locals.userInfo._id,"course_id":req.body.course_id,"isDelete":false})
            if(!payment)
                throw createError(403,"you don't pay this")
                const lesson = await Lesson.findById(req.body._id)
                .where({ isDelete: false })
                if(!lesson)
                    createError(400,'This lesson is not exist')
                return res.status(200).json({
                    'message':'oke',
                    'isSuccess': true,
                    'statusCode':200,
                    'token': res.locals.newToken,
                    'result': lesson,
                })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
}