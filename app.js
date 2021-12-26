const express = require('express')
const { create } = require('express-handlebars')
const mongoose = require('mongoose')
const host = 'localhost'
const PORT = process.env.PORT || 3000
const app = express()

//define app's router. It will automatically find index.js under folder
const routes = require('./routes')

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${host}/url-shortener`
mongoose.connect(MONGODB_URI)
//取得資料連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
db.once('disconnected', () => {
  console.log('mongodb disconnected!')
})

// create a handlebars instance which stores handlebars' settings
const hbs = create({ defaultLayout: 'main', extname: '.hbs' })
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

app.listen(PORT, host, () => {
  console.log(`Listening on http://${host}:${PORT}`)
})