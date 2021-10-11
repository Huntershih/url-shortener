const express = require('express')
const shortUrlGenerator = require('../../modules/codeGenerator/codeGenerator')
const UrlShorteners = require('../../models/urlShortener')
const routers = express.Router()

routers.get('/:short', (req, res) => {
  const short = req.params.short
  UrlShorteners.find({ short })
    .lean()
    .then(data => {
      //如果短網址不存在
      if (data.length === 0) {
        //顯示"the link is not available"       
        res.render('na', { short })
      } else {
        //如果短網址存在 - 導向到資料庫內儲存的網址
        res.redirect(`${data.origin}`)
      }
    })
    .catch(error => console.log(error))
})


routers.get('/', (req, res) => {
  res.render('index')
})

routers.post('/', (req, res) => {
  const origin = req.body.url
  let newShort = shortUrlGenerator(5)

  UrlShorteners.findOne({ origin })
    .lean()
    .then(data => {
      //如果資料庫沒有資料
      if (data.length === 0) {
        //創建一筆資料
        UrlShorteners.create({
          short: newShort,
          origin
        })
          .then(() => res.redirect(`/success/${newShort}`))
          .catch(err => console.log(err))
      } else {
        //如果資料庫有資料
        //顯示已有記錄
        res.redirect(`/success/${data.short}`)
      }
    })
    .catch(err => console.log(err))
})


module.exports = routers