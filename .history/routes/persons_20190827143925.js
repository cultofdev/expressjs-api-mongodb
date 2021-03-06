const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const client = redis.createClient('redis://10.2.126.237:6379');

const router = express.Router();

const Person = mongoose.model('persons');

// set redis response
function setResponse(result) {
    return result;
}

// retrieve all persons
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find();

        client.setex('mark', 36000, persons);

        res.json(setResponse(persons));
    } catch(error) {
        res.status(400).json({
            msg: error.message
        });
    }
});

// retreive a specific person
router.get('/', getPerson, (req, res) => {
    res.json(res.person);
});

// add person
router.post('/', async (req, res) => {
    const person = new Person({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address
    });

    try {
        const newPerson = await person.save();
        res.status(201).json({
            msg: newPerson
        });
    } catch(error) {
        res.status(400).json({
            msg: error.message
        });
    }
});

// update person
router.put('/', getPerson, async (req, res) => {
    try {
        const updatedPerson = await res.person.save();
        res.json({
            msg: `successfully updated person : ${updatedPerson}`
        });
    } catch(error) {
        res.status(500).json({
            msg: `an error encountered while updating person!`
        });
    }
});

// delete person
router.delete('/', getPerson, async (req, res) => {
    try {
        await res.person.remove();
        res.json({
            msg: `successfully deleted person: ${res.person}`
        });
    } catch(error) {
        res.status(500).json({
            msg: `an error occured while deleting person!`
        });
    }
});

async function getPerson(req, res, next) {
    let person;
    
    try {
        person = await Person.findById(req.query._id);
        if(person === null) {
            return res.status(404).json({
                msg: `cannot find person with id: ${person.id}`
            })
        }
    } catch(error) {
        return res.status(500).json({
            msg: `error encountered!`
        });
    }

    res.person = person;
    next();
}

module.exports = router;