const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener'
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
module.exports = db