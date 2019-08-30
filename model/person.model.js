const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    ip_address: {
        type: String
    }
});

mongoose.model('persons', personSchema);