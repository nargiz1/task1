const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    shower: {
        type: Boolean,
        required: true
    },
    wifi: {
        type: Boolean,
        required: true
    },
    tv: {
        type: Boolean,
        required: true
    },
    kitchen: {
        type: Boolean,
        required: true
    },
    heating: {
        type: Boolean,
        required: true
    },
    accessible: {
        type: Boolean,
        required: true
    },
    extraInfo: {
        type: String,
        required: false
    }, 
    rules: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Apartment', apartmentSchema)
