const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Define a data schema
const URLSchema = new Schema({
  originalURL: { type: String, required: true },
  shortenURL: { type: String, required: true }
})

//Export URL Schema
module.exports = mongoose.model('URL', URLSchema)