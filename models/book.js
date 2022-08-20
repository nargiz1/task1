const mongoose = require('mongoose')
const path = require('path')

const imageBasePath = 'uploads/bookImgs'

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Test'
    }
})

bookSchema.virtual('imagePath').get(function(){
    if(this.imageName != null){
        return path.join('/', imageBasePath, this.imageName)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.imageBasePath = imageBasePath