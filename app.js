const express = require('express')
const exphbs = require('express-handlebars')

const UrlShorteners = require('./models/urlShortener')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/url-shortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:short', (req, res) => {
  const shortcode = req.params.short
  UrlShorteners.find({ short: { $regex: shortcode } })
    .lean()
    .then(url => res.redirect(url[0].origin))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`The server is running at localhost:${port}`)
})