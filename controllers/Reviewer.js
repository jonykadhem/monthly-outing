const Review = require("../models/reviews")
const Restaurant = require("../models/retaurantsList")
const cloudinary = require('../config/cloudinary')


const createReview = async (req,res) => {
    const reviewData = {}

    reviewData.restaurantId = req.params.restaurantId
    reviewData.reviewerId = req.session.user.id
    reviewData.price = req.body.price
    reviewData.taste = req.body.taste
    reviewData.service = req.body.service
    reviewData.quantity = req.body.quantity
    reviewData.comment = req.body.comment

    await Review.create(reviewData)

    await Restaurant.findByIdAndUpdate(req.params.restaurantId, {
        status: 'reviewed',
    })

    res.redirect('/suggestions')
}