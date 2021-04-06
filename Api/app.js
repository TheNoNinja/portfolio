//Import requirements
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

//Important settings
const APP_PORT = 3080
const whitelist = ['http://localhost:8080']

//Make global variables
const app = express()
const articleRoute = require('./routes/articles')

//Generate the object containing all whitelisted sites
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Setup the MiddleWares
app.use(cors()) //TODO: Add cors options to restrict access
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

//Setup routes
app.use('/api/articles', articleRoute)

//Connect to DB and start listening
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log(`Connected to DB`)
  app.listen(APP_PORT, () => {
    console.log(`Started listening on http://localhost:${APP_PORT}/`)
  })
})


