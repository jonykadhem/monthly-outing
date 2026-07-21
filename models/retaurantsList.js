const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    instagram:{
        type: String,
    },
    recommendation: {
        type: String,
    },
    details: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
},{ timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantsSchema);

module.exports = Restaurant;

