const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport')

// pulls data from passport setup
require('./config/passport')

const API_PORT = process.env.API_PORT || 8080;
const app = express();
app.use(cors());
const router = express.Router();


// connects our back end code with the database
mongoose.connect('mongodb://localhost/snapDocsdb', {
    useNewUrlParser: true
});

let db = mongoose.connection;

// Requiring the `Document` model for accessing the `documents` collection
var Documents = require("../backend/models/Documents.js");
var User = require('../backend/models/models.js');

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
app.use(passport.initialize())

// append /api for our http requests
app.use("/api", router);

require('./routes/deleteUser');
require('./routes/findUsers');
require('./routes/loginUser');
// require('./routes/registerUser');
require('./routes/updateUser');
// require('./routes/getData');

router.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if(err) {
            console.log('a', err)
        }
        if (info !== undefined) {
            console.log('b', info.message);
        } else {
            req.logIn(user, err => {
                const data = {
                    username: req.body.name,
                    email: req.body.email,
                };
                User.findOne({
                    where: {
                        username: data.username
                    }
                }).then(user => {
                    user.update({
                        username: data.username,
                        email: data.email
                    }).then(() => {
                        console.log('user created in db');
                        res.status(200).send({ message: 'user created'})
                    })
                })
            })
        }
    })(req, res, next);
})


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