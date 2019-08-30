const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    car_make: {
        type: String
    },
    car_model: {
        type: String
    },
    car_model_year: {
        type: String
    },
    car_vin: {
        type: String
    },
    color: {
        type: String
    }
});

mongoose.model('cars', carSchema);