const express = require('express')
const shortUrlGenerator = require('../../modules/codeGenerator/codeGenerator')
const UrlShorteners = require('../../models/urlShortener')
const routers = express.Router()


routers.get('/', (req, res) => {
  res.render('index')
})

routers.post('/', (req, res) => {
  const origin = req.body.url
  let newShort = shortUrlGenerator(5)

  UrlShorteners.findOne({ origin })
    .lean()
    .select('short')
    .then(data => {
      if (!data) {
        UrlShorteners.create({
          short: newShort,
          origin
        })
        res.render('index', { newShort, origin })
      } else {
        res.render('index', { data, origin })
      }
    })
    .catch(err => console.log(err))
})

routers.get('/:short', (req, res) => {
  const shortcode = req.params.short
  UrlShorteners.find({ short: { $regex: shortcode } })
    .lean()
    .then(url => res.redirect(url[0].origin))
    .catch(error => console.log(error))
})

module.exports = routers