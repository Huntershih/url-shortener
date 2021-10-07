const db = require('../../config/mongoose')
const urlShortener = require('../urlShortener')

db.once('open', () => {
  urlShortener.create(
    {
      short: 'AxZeE',
      origin: 'https://google.com'
    },
    {
      short: 'BFdyt',
      origin: 'https://facebook.com'
    }
  )
  console.log('mongoDB connected!')
})