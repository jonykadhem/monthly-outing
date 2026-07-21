const Review = require("../models/reviews")
const cloudinary = require('../config/cloudinary')


const createReview = async (req,res) => {
    const reviewData = {}

    reviewData.restaurantId = req.params.restaurantId
    reviewData.reviewerId
}