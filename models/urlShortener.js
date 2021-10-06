const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlShortenerSchema = new Schema({
  short: {
    type: String,
    require: true
  },
  origin: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('urlShortener', urlShortenerSchema)