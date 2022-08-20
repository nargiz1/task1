const express = require("express");
const router = express.Router();
const path = require('path')
const Test = require('../models/test')
const Book = require('../models/book');
const uploadPath = path.join('public', Book.imageBasePath)
const multer = require("multer");
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) =>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//All
router.get("/", async (req, res) => {
    const books = await Book.find({})
    console.log(books)
    res.render('books/index', {
        books: books
    })
});

//New
router.get("/new", async (req, res) => {
    try{
        const tests = await Test.find({})
        const book = new Book()
        console.log(tests)
        res.render('books/new', {
            tests: tests,
            book: book
        })
    }catch{
        res.redirect('/book')
    }
});

router.post("/", upload.single('image'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : "smth"
    const book = new Book({
        name: req.body.name,
        imageName: fileName,
        test: req.body.test.trim()
    })
    console.log(book)
    try{
        const newBook = await book.save()
        res.redirect('/book')
    }catch{
        res.send('Error')
    }
  
});

module.exports = router;
