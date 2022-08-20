const mongoose = require('mongoose')
const path = require('path')


const imageBasePath = 'uploads/roomImages'

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Apartment'
    }
})

roomSchema.virtual('imagePath').get(function(){
    if(this.imageName != null){
        return path.join('/', imageBasePath, this.imageName)
    }
})

module.exports = mongoose.model('Room', roomSchema)
module.exports.imageBasePath = imageBasePath
