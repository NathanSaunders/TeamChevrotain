const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport')


const API_PORT = process.env.API_PORT || 8080;

// Requiring the `Document` model for accessing the `documents` collection
const Documents = require('../backend/models/Documents');
// Requiring the `User` model for accessing the `users` collection
const User = require('../backend/models/User');

const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
// const dbRoute = "mongodb+srv://auth_user:Openwater_19@cluster0-ot0uy.mongodb.net/test?retryWrites=true";
const dbRoute = "mongodb://admin:Level2020@ds229826.mlab.com:29826/heroku_b8xc1m20"

// connects our back end code with the database
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true
    }
);

// to connect to mLab db via command line:
// mongo ds229826.mlab.com:29826/heroku_b8xc1m20 -u loggedIn -p Level2020


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
// const Documents = require("../backend/models/Documents.js");
const routes = require('./routes/routes')
const secureroute = require('./routes/secureroutes');

// append /api for our http requests
app.use("/api", router);
app.use("/", routes);
app.use('/user', passport.authenticate('jwt', {
    section: false
}), secureroute)

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
    let data = new Documents();
    const {
        title,
        content
    } = req.body;

    data.title = title;
    data.content = content;
    data.save((err, responseObject) => {
        let document_id = responseObject._id;
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            // gets data id of new document and sends to App.js in response object
            _id: document_id
        });
    })
});


// exmaple
// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const {
        _id,
        content
    } = req.body;
    Documents.findOneAndUpdate({
        _id: _id
    }, {
        $set: {
            content: content
        }
    }, {
        new: true
    }, (err, doc) => {
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