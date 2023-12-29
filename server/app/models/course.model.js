const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')


const courseSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    price: {
        type : Number,
        required: true,
    },
    image:{
        type: String,
    },
    author_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false,
    },
    categories: [String],
    tags: [String],
    isDelete: {
        type: Boolean,
        require: true,
    },
  },
  {timestamps: true}
)
const Course = model("Course", courseSchema)
module.exports = Course


