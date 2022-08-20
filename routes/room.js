const express = require("express");
const router = express.Router();
const path = require('path')
const Room = require('../models/room')
const Apartment = require('../models/apartment')
const uploadPath = path.join('public', Room.imageBasePath)
const multer = require("multer")
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) =>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//All
router.get("/", async (req, res) => {
    const rooms = await Room.find({
        apartment: "62fff95d22b9f5e1ac742e55"
    })
    console.log(rooms)
    res.send("Rooms")
});

//New
router.get("/new", async (req, res) => {
    try{
        const apartments = await Apartment.find({})
        const room = new Room()
        res.render('rooms/new', {
            apartments: apartments,
            room: room
        })
    }catch{
        res.redirect('/room')
    }
});

router.post("/", upload.single('image'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const room = new Room({
        name: req.body.name,
        imageName: fileName,
        apartment: req.body.apartment.trim()
    })
    console.log(room)
    try{
        const newRoom = await room.save()
        res.redirect('/room')
    }catch{
        res.send('Error')
    }
});

module.exports = router;
