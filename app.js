const express = require('express')
const { create } = require('express-handlebars')
const host = 'localhost'
const PORT = process.env.PORT || 3000
const app = express()

// create a handlebars instance which stores handlebars' settings
const hbs = create({ defaultLayout: 'main', extname: '.hbs' })
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// set view path to /views; process.cwd()=>present current working directory
app.set('views', process.cwd() + '/views')

app.get('/', (req, res) => {
  res.render('index')
})
app.listen(PORT, host, () => {
  console.log(`Listening on http://${host}:${PORT}`)
})