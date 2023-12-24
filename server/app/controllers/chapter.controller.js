require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Chapter = require("../models/chapter.model")
const Course = require("../models/course.model")
module.exports = {
    createChapter: async(req,res,next) => {
        try{
            const request = req.body.change
            delete request._id
            const chapter = new Chapter(request)
            if(chapter===null)
                throw createError(400,'create fail')
            await chapter.save()
            next(request.course_id)
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    updateChapter: async(req, res,next) => {
        try{
            const chapter = await Chapter.findById(req.body.change._id)
            if(!chapter)
                throw createError(400,'something went wrong')
            await Object.assign(chapter,req.body.change)
            await chapter.save()
            
            next(chapter.course_id)
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllChapterByCourse : async(req,res, next)=>{
        try{
            const chapters = await Chapter.find({course_id: req.body._id,isDelete:false})
            const redisClient = req.redisClient
            await redisClient.set('chapter',JSON.stringify(chapters))
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': chapters,
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    deleteChapterById : async(req,res, next)=>{
        try{
            const chapter = await Chapter.findById()
            await Chapter.updateOne({_id:req.body._id},{isDelete:true})
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getChapterWithLesson : async(req,res,next)=>{
        try{
            const chapters = await Chapter.find({course_id: req.body.course_id,isDelete:false})
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getChapterById : async(req,res,next)=>{
        try{
            const chapter = await Chapter.findById(req.body._id)
            .where({ isDelete: false })
            if(!chapter)
                throw createError(400,"This chapter does not exist")
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': chapter,
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    }
}