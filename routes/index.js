const express = require('express')
const routers = express.Router()
const home = require('./modules/home')

routers.use('/', home)

module.exports = routers