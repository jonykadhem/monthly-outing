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

    let creatSuggestions = await Restaurant.create(restaurantData)

    res.redirect('/home')
}

module.exports = {
    showNewRestaurantForm,
    creatSuggestion,
}