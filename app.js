const express = require('express')
const { create } = require('express-handlebars')
const PORT = process.env.PORT || 3000

//define app's router. It will automatically find index.js under folder
const routes = require('./routes')

// create a handlebars instance which stores handlebars' settings
const hbs = create({ defaultLayout: 'main', extname: '.hbs' })

require('./config/mongoose')

const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// set view path to /views; process.cwd()=>present current working directory
app.set('views', process.cwd() + '/views')

// set static file root
app.use('/', express.static('public'))

// set body parser for post message
app.use('/', express.urlencoded({ extended: true }))

//bind router to '/'
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})