const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    stock_market: {
        type: String
    },
    stock_symbol: {
        type: String
    },
    stock_name: {
        type: String
    },
    stock_market_cap: {
        type: String
    },
    stock_sector: {
        type: String
    },
    stock_industry: {
        type: String
    }
});

mongoose.model('stocks', stockSchema);