const URL = require('../URLModels')
const seedData = require('./URLs.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  URL.create(seedData)
})
