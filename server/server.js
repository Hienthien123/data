const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')
const Redis = require('@upstash/redis').Redis
const cors = require('cors');
require('./app/config/database.config')()
require('dotenv').config()
const app = express()
let redisClient;
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
  }));
app.use((req, res, next) => {
if (!redisClient) {
    redisClient = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
        })
    console.log('Connected to Redis');

}
    req.redisClient = redisClient;
    next();
})
//auth route
const authRouter = require('./app/routes/auth.route')
app.use('/api/auth',authRouter)

//user route
const userRoute = require('./app/routes/user.route')
app.use('/api/user',userRoute)

const courseRoute = require('./app/routes/course.route')
app.use('/api/course',courseRoute)

const chapterRoute = require('./app/routes/chapter.route')
app.use('/api/chapter',chapterRoute)

const lessonRoute = require('./app/routes/lesson.route')
app.use('/api/lesson',lessonRoute)

const paymentRoute = require('./app/routes/payment.route')
app.use('/api/payment',paymentRoute)

const reviewRoute = require('./app/routes/review.route')
app.use('/api/review',reviewRoute)

const imageRoute = require('./app/routes/image.route')
app.use('/api/image',imageRoute)


app.use((req, res, next)=>{
    next(createError(404, 'Not Found'));
})

app.use((err, req, res, next)=>{
    // res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})






app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running')
})  


















