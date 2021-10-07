const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

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
app.use(express.urlencoded({ extname: true }))
app.use(routes)


const port = 3000

app.listen(port, () => {
  console.log(`The server is running at localhost:${port}`)
})