const express = require('express')
const routers = express.Router()
const home = require('./modules/home')
const success = require('./modules/success')

routers.use('/', home)
routers.use('/success', success)

module.exports = routers