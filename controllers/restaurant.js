const Restaurant = require("../models/retaurantsList")
const cloudinary = require('../config/cloudinary')
const Review = require("../models/reviews")

//adding restaurants suggestions
const showNewRestaurantForm = (req, res) => {
    res.render('restaurants/new-restaurant.ejs')
}
const creatSuggestion = async(req,res) => {
    const restaurantData = {}
    restaurantData.name = req.body.name
    restaurantData.location = req.body.location
    restaurantData.instagram = req.body.instagram
    restaurantData.recommendation = req.body.recommendation
    restaurantData.details = req.body.details
    restaurantData.owner = req.session.user.id

    let creatSuggestions = await Restaurant.create(restaurantData)

    res.redirect('/suggestions')
}

const showAllSuggestions = async (req, res) =>{
    let allSuggestions = await Restaurant.find({status: 'suggested'}).populate()
    res.render('restaurants/show-all-restaurants.ejs', {
        allSuggestions,
        
    })
}

const showDetails = async (req, res) => {
    const foundRestaurant = await Restaurant.findById(req.params.restaurantId).populate('owner')
    const reviews = await Review.find({restaurantId:req.params.restaurantId}).populate('reviewerId')

    let categoryAverages = null
    let overallAverage = null

    if(reviews.length > 0){
        const total = reviews.reduce((acc, review) => {
            acc.price += review.price
            acc.taste += review.taste
            acc.quantity += review.quantity
            acc.service += review.service
            return acc
        }, { price: 0, taste: 0, quantity: 0, service: 0 })

        categoryAverages = {
            price: total.price / reviews.length,
            taste: total.taste / reviews.length,
            quantity: total.quantity / reviews.length,
            service: total.service / reviews.length,
        }
        const totalAll = categoryAverages.price + categoryAverages.taste + categoryAverages.quantity + categoryAverages.service
        overallAverage = (totalAll / (reviews.length * 4)).toFixed(1)
    }

    res.render('restaurants/showDetails.ejs', {
        foundRestaurant,
        reviews,
        categoryAverages,
        overallAverage,
    })
}

const deleteSuggestion = async (req,res) =>{
    let foundRestaurant = await Restaurant.findById(req.params.restaurantId).populate('owner')
    const isOwner = foundRestaurant.owner.equals(req.session.user._id)
    const isAdmin = req.session.user.role === 'admin'

    if( isOwner || isAdmin ){
        await Restaurant.findByIdAndDelete(req.params.restaurantId)
        res.redirect('/suggestions')
    }else{
        res.send('you cant delete')
    }
}
const showEditForm = async(req, res) => {
    let foundRestaurant = await Restaurant.findById(req.params.restaurantId).populate('owner')
    res.render('restaurants/edit-restaurant.ejs',{
        foundRestaurant
    })
}
const editRestaurant = async (req, res) => {
    let foundRestaurant = await Restaurant.findById(req.params.restaurantId).populate('owner')

    const restaurantData = {}
    restaurantData.name = req.body.name
    restaurantData.location = req.body.location
    restaurantData.instagram = req.body.instagram
    restaurantData.recommendation = req.body.recommendation
    restaurantData.details = req.body.details
    restaurantData.owner = req.session.user.id

    await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body)
    res.redirect(`/restaurant/${req.params.restaurantId}`)
}

module.exports = {
    showNewRestaurantForm,
    creatSuggestion,
    showAllSuggestions,
    showDetails,
    deleteSuggestion,
    showEditForm,
    editRestaurant,
}