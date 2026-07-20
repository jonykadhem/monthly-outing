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
    }
    
},{ timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantsSchema);

module.exports = Restaurant;

