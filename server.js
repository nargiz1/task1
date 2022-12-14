if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const apartmentRouter = require('./routes/apartment')
const roomRouter = require('./routes/room')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname +'/public'))
app.use(bodyParser.urlencoded({limit: '100000mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect((process.env.DATABASE_URL), {
useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log("Connected"))


app.use('/', indexRouter)
app.use('/apartment', apartmentRouter)
app.use('/room', roomRouter)

app.listen(process.env.PORT || 3000)