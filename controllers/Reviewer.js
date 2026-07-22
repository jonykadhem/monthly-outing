const Review = require("../models/reviews")
const Restaurant = require("../models/retaurantsList")
const cloudinary = require('../config/cloudinary')
const { model } = require("mongoose")



const showReviewForm = async(req, res) => {
    let foundRestaurant = await Restaurant.findById(req.params.restaurantId)
    res.render('reviews/add-review.ejs',{
        foundRestaurant,
    })
}

const createReview = async (req,res) => {
    console.log(req.body)
    
    const reviewData = {}

    reviewData.restaurantId = req.params.restaurantId
    reviewData.reviewerId = req.session.user.id
    reviewData.price = req.body.price
    reviewData.taste = req.body.taste
    reviewData.service = req.body.service
    reviewData.quantity = req.body.quantity
    reviewData.comment = req.body.comment

    const createdReview = await Review.create(reviewData)

    console.log(createdReview)

    await Restaurant.findByIdAndUpdate(req.params.restaurantId, {
        
        status: 'reviewed',
    })

    res.redirect('/suggestions')
}

const showAllReviews = async(req, res) => {
    let allReviews = await Restaurant.find({status: 'reviewed'}).populate()

    res.render('reviews/show-reviews.ejs', {
        allReviews,
    })

}






module.exports = {
    showReviewForm,
    createReview,
    showAllReviews,
}