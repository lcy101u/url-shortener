const express = require('express')
const { create } = require('express-handlebars')
const mongoose = require('mongoose')
const host = 'localhost'
const PORT = process.env.PORT || 3000
const app = express()
const URLModels = require('./models/URLModels')
const url = require('url')
const generateURLID = require('./utils/generateURLID')

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

app.get('/', (req, res) => {
  res.render('index', { result: null })
})
app.post('/', (req, res) => {
  //https://nodejs.org/api/url.html#urlformaturl-options
  const originalURLObject = new URL(req.body.url.trim())
  const originalURL = url.format(originalURLObject)
  const shortenURL = generateURLID(5)
  URLModels.findOne({ originalURL })
    .lean()
    .then(data => 
      data ? data : URLModels.create({ originalURL, shortenURL }))
    .then(data => {
      const result = req.headers.origin + '/' + data.shortenURL
      console.log(result)
      res.render('index', { originalURL, result})
    })
    .catch(err => console.error(err))
  // res.render('index', {originalURL})
})
app.listen(PORT, host, () => {
  console.log(`Listening on http://${host}:${PORT}`)
})