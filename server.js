const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passRoutes = express.Router();
const PORT = 8080;

// Requiring the `Document` model for accessing the `documents` collection
var Document = require("./backend/models/models.js");

let PWSchema = require('./backend/models/models');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/snapDocsdb', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Connected to Mongo Database");
})


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
})