const express = require('express')
const router = express.Router()
const Apartment = require('../models/apartment')
const Room = require('../models/room')

router.get('/', async (req, res) => {
    const apartment = await Apartment.find({
        _id: "62fff917e16dba583f6f2d9d"
    })
    const rooms = await Room.find({
        apartment: "62fff917e16dba583f6f2d9d"
    })
    console.log(apartment)
    res.render('index', {
        apartment: apartment[0],
        rooms: rooms
    })
})

module.exports = router