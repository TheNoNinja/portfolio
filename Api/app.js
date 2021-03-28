//Import requirements
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//Important settings
const APP_PORT = 3080;
var whitelist = ['http://localhost:8080']

//Make global variables
const app = express();
const articleRoute = require('./routes/articles');

//Generate the object containing all whitelisted sites
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Setup the middelwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Setup routes
app.use('/api/articles', articleRoute);

//Make connection to the DB and if the conneciton is successfull start the web server
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("Connected to mongoDB!");
    app.listen(APP_PORT, () => {
        console.log(`Started listening on http://localhost:${APP_PORT}/`);
    });
});

