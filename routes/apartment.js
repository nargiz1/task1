const express = require("express");
const router = express.Router();
const Apartment = require('../models/apartment')

//All
router.get("/", async (req, res) => {
    const apartments = await Apartment.find({})
    console.log(apartments)
});

//New
router.get("/new", async (req, res) => {
    try{
        const apartment = new Apartment()
        res.render('apartments/new', {
            apartment: apartment
        })
    }catch{
        res.redirect('/apartment')
    }
});

router.post("/", async (req, res) => {
    console.log(req.body.tv)
    const apartment = new Apartment({
        name: req.body.name,
        maxPeople: req.body.maxPeople,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        shower: req.body.shower ?? "false",
        wifi: req.body.wifi ?? "false",
        tv: req.body.tv ?? "false",
        kitchen: req.body.kitchen ?? "false",
        heating: req.body.heating ?? "false",
        accessible: req.body.accessible ?? "false",
        extraInfo: req.body.extraInfo,
        rules: req.body.rules
    })
    try{
        const newApartment = await apartment.save()
        res.redirect('/apartment')
    }catch{
        res.send('Error')
    }
  
});

module.exports = router;
