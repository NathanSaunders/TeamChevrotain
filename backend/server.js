const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport')


// ==========================================================


const API_PORT = process.env.API_PORT || 8080;
const app = express();
app.use(cors());
const router = express.Router();

// connects our back end code with the database
mongoose.connect('mongodb://localhost/snapDocsdb', {
    useNewUrlParser: true
});

// checks if connection with the database is successful
let db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to Mongo Database");
})

mongoose.Promise = global.Promise;

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

require('./auth/auth');

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(passport.initialize())

// Requiring the `Document` model for accessing the `documents` collection

const Documents = require("../backend/models/Documents.js");
const routes = require('./routes/routes')
const secureroute = require('./routes/secureroutes');

// append /api for our http requests
app.use("/api", router);
app.use("/", routes);
app.use('/user', passport.authenticate('jwt', {section: false}), secureroute)

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

// this is our create method
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