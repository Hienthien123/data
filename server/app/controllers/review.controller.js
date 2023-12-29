require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Review = require("../models/review.model")
const Course = require("../models/course.model")
const User = require("../models/user.model")
const Topic = require("../models/topic.model")
const axios = require('axios');
module.exports = {
    create: async (req, res, next) => {
        try {
            const request = req.body.change
            delete request._id
            delete request.user_id
            delete request.topic_id
            request.user_id = res.locals.userInfo._id

            const apiUrl = 'http://127.0.0.1:8000/check';

            // console.log(req.body)
            const input_data = {
            
                    input_word: req.body.change.review_text,
                
                
              };
              console.log(input_data)
            
            await axios.post(apiUrl, input_data)
              .then(response => {
                console.log('Response from server:', response.data);
                request.review_text = response.data.result
              })
              .catch(error => {
                console.error('Error posting data:', error.message);
              });


            const review = new Review(request)
            review.user_id = res.locals.userInfo._id
            await review.save()
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
    read: async (req, res, next) => {
        try {
            const reviews = await Review.find({course_id: req.body._id})
            .populate({
                path: 'topic_id',
                select: 'topic'
            })
            .populate({
                path: 'user_id',
                select: 'username',
                select: 'profile'
            })

            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': reviews,
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req, res, next)=>{
        try {
            const review = await Review.findByIdAndDelete(req.body._id)
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
    update: async(req, res, next)=>{
        try {
            const review = await Review.findByIdAndUpdate(req.body.change._id, req.body.change)
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
    getById :async (req, res, next) => {
        try {
            const review = await Review.findById(req.body._id)
            .populate({
                path: 'topic_id',
                select: 'topic'
            })
            .populate({
                path: 'user_id',
                select: 'username',
            })
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': review,
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    
}