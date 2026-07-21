const Restaurant = require("../models/retaurantsList")
const cloudinary = require('../config/cloudinary')


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
    let allSuggestions = await Restaurant.find().populate()
    res.render('restaurants/show-all-restaurants.ejs', {
        allSuggestions,
    })
}

const showDetails = async (req, res) => {
    let foundRestaurant = await Restaurant.findById(req.params.restaurantId)
    res.render('restaurants/showDetails.ejs', {
        foundRestaurant
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

module.exports = {
    showNewRestaurantForm,
    creatSuggestion,
    showAllSuggestions,
    showDetails,
    deleteSuggestion,
    showEditForm,
}