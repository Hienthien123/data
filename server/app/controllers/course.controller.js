require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Course = require("../models/course.model")
const Review = require("../models/review.model")
const Topic = require("../models/topic.model")
const { request } = require('express')
module.exports = {
    createCourse : async(req, res, next) => {
        try {
            const request = req.body.change
            request.author_id=res.locals.userInfo._id
            delete request._id
            const course = new Course(request)
            course.isDelete = false
            // course.author_id = res.locals.userInfo._id
            await course.save()
            next()
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getCourseById : async(req, res, next) => {
        try{
            const courseId = req.body._id
            const course = await Course.findById(courseId)
            if(!course)
                throw createError(400,'something went wrongggg')
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': course,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    changeCourse: async(req,res,next) => {
        try{
            // console.log(req.body.changed)
            const course = await Course.findById(req.body.change._id)
            

            if(!course)
                createError(400,'something went wrong')
            Object.assign(course,req.body.change)
            
            await course.save()
            next()
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    deleteCourse: async(req,res,next) => {
        try{
            await Course.updateOne({_id:req.body._id},{isDelete: true})
            next()
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseByAuthor: async(req,res,next)=>{
        try{
            // console.log("test")
            courses = await Course.find({
                author_id: req.body.author_id,
                isDelete: false,
            })
            if(!courses || courses.length === 0)
                throw createError('400','This author created no course')
            return res.status(200).json({
                'message': 'oke',
                courses,
            })

        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseByTag: async(req,res,next) =>{
        try{
            const courses = await Course.find({
                tags: { $in: req.body.tags },
                isDelete: false,
            })
            if(!courses || courses.length === 0)
                throw createError('400','There is no course for this tags')
            return res.status(200).json({
                'message': 'oke',
                courses,
            })

        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseByCategory: async(req,res,next)=>{
        try{
            const courses = await Course.find({
                categories:{$in: req.body.categories},
                isDelete: false,
            })
            if(!courses || courses.length === 0)
                throw createError('400','There is no course for this categories')
            return res.status(200).json({
                'message': 'oke',
                courses,
            })

        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    searchCourseByKeyword: async(req,res,next) =>{
        try{
            const courses = await Course.find({
                title: { $regex: new RegExp(req.body.keyword, 'i') }, 
                isDelete: false,
            })
            return res.status(200).json({
                'message':'oke',
                'result': courses,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getFullCourseData: async (req, res,next) =>{
        try{
            const courseId = req.body.courseId
            const course = await Course.findById(courseId)
            if(!course)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'course_data': course,
                'token': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllCourse: async (req, res,next) =>{
        try{
            const courseId = req.body.courseId
            const course = await Course.find({isDelete:false})
            if(!course)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'course_data': course,
                'token': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseAdmin: async (req, res,next) =>{
        try{
            const courses = await Course.find({isDelete:false})
            const redisClient = req.redisClient
            redisClient.set('getallcourse',JSON.stringify(courses))
            return res.status(200).json({
                'message':'oke',
                'result': courses,
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
}