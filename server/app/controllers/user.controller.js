const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.model')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Review = require("../models/review.model")
const Topic = require("../models/topic.model")

module.exports = {
    changeProfile : async(req, res, next) => {
        try{
            //get new profile from request
            email = req.body.email
            profile = JSON.parse(req.body.profile)

            await User.updateOne({email},{profile})
            const users = await User.find({})
            const redisClient = req.redisClient
            await redisClient.set('getalluser',JSON.stringify(users))
            
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getUserById : async(req, res, next) =>{
        try{
            const user = await User.findById(req.body._id)
            if (!user)
                throw createError(400,'this user is not exist')
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': user,
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getUserByUsername: async(req, res, next) =>{
        try{
            const user = await User.findOne({username: req.body.username},{username: 1,profile: 1})
            if (!user)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': user,
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    disableUser: async(req, res, next)=>{
        try{
            await User.updateOne({_id:req.body._id},{isActive: false})
            // console.log(await User.findById(req.body._id))
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllUser: async(req,res,next) =>{
        try{
            const users = await User.find({})
            const redisClient = req.redisClient
            await redisClient.set('getalluser',JSON.stringify(users))
            return res.status(200).json({
                'message':'oke',
                'isSuccess': true,
                'statusCode':200,
                'token': res.locals.newToken,
                'result': users,
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    changeUserInfo: async (req,res,next) =>{
        try{
            const user = await User.findById(req.body.change._id)
            if(!user)
                createError(400,'this user is not exist')
            
            Object.assign(user,req.body.change)
            await user.save()
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    }
}