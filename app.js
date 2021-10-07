const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extname: true }))
app.use(routes)


const port = 3000

app.listen(port, () => {
  console.log(`The server is running at localhost:${port}`)
})