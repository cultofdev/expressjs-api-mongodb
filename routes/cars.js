const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Car = mongoose.model('cars');

// retrieve all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch(error) {
        res.status(400).json({
            msg: error.message
        });
    }
});

// retrieve a specific car

// add car

// update car

// delete car

module.exports = router;