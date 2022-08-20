const express = require('express')
const router = express.Router()
const Apartment = require('../models/apartment')
const Room = require('../models/room')

router.get('/', async (req, res) => {
    const apartments = await Apartment.find({})
    const apartment = apartments[0]
    const rooms = await Room.find({
        apartment: apartment.id
    })
    console.log(apartment)
    res.render('index', {
        apartment: apartment,
        rooms: rooms
    })
})

module.exports = router