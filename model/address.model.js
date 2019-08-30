const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: String
    }
});

mongoose.model('address', addressSchema, 'address');