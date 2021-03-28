const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const APP_PORT = 3080;
const app = express();

const articleRoute = require('./routes/articles');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/articles', articleRoute);

app.get('/', (req, res) => {
    res.send("This is the API for my portfolio. You shouldn't be here but welcome anyway");
});

app.get('/api/', (req, res) => {
    res.send("Here will be a list of all routes");
});

mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("Connected to mongoDB!");
    app.listen(APP_PORT, () => {
        console.log(`Started listening on http://localhost:${APP_PORT}/`);
    });
});

