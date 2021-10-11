const express = require('express')
const routers = express.Router()
const UrlShorteners = require('../../models/urlShortener')

routers.get('/:short', (req, res) => {
  const short = req.params.short
  UrlShorteners.find({ short })
    .lean()
    .then(data => {
      if (data.length === 0) {
        res.render('na', { short })
      } else {
        res.render('success', { short })
      }
    })
    .catch(err => console.log(err))
})

module.exports = routers