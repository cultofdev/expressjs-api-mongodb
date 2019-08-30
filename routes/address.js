const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Address = mongoose.model('address');

// retrieve all addresses
router.get('/', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses)
    } catch(error) {
        res.status(400).json({
            msg: error.message
        });
    }
});

// retrieve a specific address
router.get('/', getAddress, (req, res) => {
    res.json(res.address);
});

// add address
router.post('/', async (req, res) => {
    const address = new Address({
        id: req.body.id,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone
    });

    try {
        const newAddress = await address.save();
        res.status(201).json({
            msg: newAddress
        });
    } catch(error) {
        res.status(400).json({
            msg: error.message
        });
    }
});

// update address
router.put('/', getAddress, async (req, res) => {
    try {
        const updatedAddress = await res.address.save();
        res.json({
            msg: `successfullyy updated address ${updatedAddress}`
        });
    } catch(error) {
        res.status(500).json({
            msg: `an error encountered while updating address!`
        });
    }
});

// delete address
router.put('/', getAddress, async (req, res) => {
    try {
        await res.address.remove();
        res.json({
            msg: `successfully deleted address: ${res.address}`
        });
    } catch(error) {
        res.status(500).json({
            msg: `an error occured while deleting address!`
        });
    }
});

async function getAddress(req, res, next) {
    let address;

    try {
        address = await Address.findById(req.query._id);
        if(address === null) {
            return res.status(404).json({
                msg: `cannot find address with id: ${address._id}`
            });
        }
    } catch(error) {
        return res.status(500).json({
            msg: `error encountered!`
        });
    }

    res.address = address;
    next();
}

module.exports = router;