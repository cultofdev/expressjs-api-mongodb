const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stock = mongoose.model('stocks');

// retrieve all stocks
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch(error) {
        res.status(400).json({
            msg: error.message
        });
    }
});

module.exports = router;

// retrieve a specific stock

// add stock

// update stock

// delete stock