//Import requirements
const express = require('express');
const cors = require('cors');

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
app.use(cors()); //TODO: Add cors options to restrict access
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Setup routes
app.use('/api/articles', articleRoute);

//Start server
app.listen(APP_PORT, () => {
    console.log(`Started listening on http://localhost:${APP_PORT}/`);
});


