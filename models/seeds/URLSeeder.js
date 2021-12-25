const mongoose = require('mongoose')
const host = 'localhost'
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${host}/url-shortener`
const URL = require('../URLModels')
const seedData = require('./URLs.json').results
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
  URL.create(seedData)
})
db.once('disconnected', () => {
  console.log('mongodb disconnected!')
})