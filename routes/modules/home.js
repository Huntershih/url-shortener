const express = require('express')
const validUrl = require('valid-url')
const shortUrlGenerator = require('../../modules/codeGenerator/codeGenerator')
const UrlShorteners = require('../../models/urlShortener')
const routers = express.Router()






routers.get('/', (req, res) => {
  res.render('index')
})

routers.post('/', (req, res) => {
  const origin = req.body.url
  let newShort = shortUrlGenerator(5)

  //防止使用者輸入非網址或空白資訊並提醒
  if (!validUrl.isUri(origin))
    res.status(418).send("Invalid Input Data")

  //確認網址型態
  UrlShorteners.find({ origin })
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
        res.redirect(`/success/${data[0].short}`)
      }
    })
    .catch(err => console.log(err))
})

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
        res.redirect(`${data[0].origin}`)
      }
    })
    .catch(error => console.log(error))
})

module.exports = routers