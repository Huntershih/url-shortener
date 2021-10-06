const mongoose = require('mongoose')
const urlShortener = require('../urlShortener')
mongoose.connect('mongodb://localhost/url-shortener')
const UrlShorteners = require('../urlShortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  urlShortener.create(
    {
      short: 'AxZeE',
      origin: 'https://google.com'
    }, {
    short: 'BFdyt',
    origin: 'https://facebook.com'
  }
  )
  console.log('mongoDB connected!')
})