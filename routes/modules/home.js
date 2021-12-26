const express = require('express')
const URLModels = require('../../models/URLModels')
const generateURLID = require('../../utils/generateURLID')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { result: null })
})
router.post('/', (req, res) => {
  //https://nodejs.org/api/url.html#urlformaturl-options
  const originalURLObject = new URL(req.body.url.trim())
  const originalURL = originalURLObject.href
  const shortenURL = generateURLID(5)
  URLModels.findOne({ originalURL })
    .lean()
    .then(data => 
      data ? data : URLModels.create({ originalURL, shortenURL }))
    .then(data => {
      const result = req.headers.origin + '/' + data.shortenURL
      res.render('index', { originalURL, result})
    })
    .catch(err => console.error(err))
})
router.get('/:shortenURL', (req, res) => {
  const { shortenURL } = req.params
  URLModels.findOne({shortenURL})
    .lean()
    .then(data =>
      data ? res.redirect(data.originalURL) : res.render('error', {errMsg : 'Error URL.'}))
    .catch(err => console.error(err))
})
//exports router module
module.exports = router