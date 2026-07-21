const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price:{
        type:Number,
        required: true,
        min: 1 ,
        max: 5,
    },
    taste:{
        type:Number,
        required: true,
        min: 1 ,
        max: 5,
    },
    quantity:{
        type:Number,
        required: true,
        min: 1 ,
        max: 5,
    },
    service:{
        type:Number,
        required: true,
        min: 1 ,
        max: 5,
    },
    comment:{
        type: String,
        required: true,
    },
},{timestamps: true})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;