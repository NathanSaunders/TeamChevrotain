const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = 8080;
const app = express();
app.use(cors());
const router = express.Router();

// connects our back end code with the database
mongoose.connect('mongodb://localhost/snapDocsdb', {
    useNewUrlParser: true
});

let db = mongoose.connection;

// Requiring the `Document` model for accessing the `documents` collection
var Documents = require("../backend/models/models.js");

// checks if connection with the database is successful
db.once('open', function () {
    console.log("Connected to Mongo Database");
})

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger("dev"));

// append /api for our http requests
app.use("/api", router);


// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    Documents.find((err, data) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            data: data
        });
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const {id, content} = req.body;

    if ((!id && id !== 0) || !content) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.content = content;
    data.id = id;
    data.save(err => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true
        });
    });
});


app.listen(API_PORT, function () {
    console.log("Server is running on Port: " + API_PORT);
})