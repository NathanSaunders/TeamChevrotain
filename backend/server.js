const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Requiring the `Document` model for accessing the `documents` collection
const Documents = require('../backend/models/Documents');
// Requiring the `User` model for accessing the `users` collection
const User = require('../backend/models/User');


const API_PORT = 8080;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://auth_user:Openwater_19@cluster0-ot0uy.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true
    }
);

let db = mongoose.connection;

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
  const { _id, content } = req.body;
  Documents.findOneAndUpdate({_id: _id}, {$set:{content: content}}, {new: true}, (err, doc)=> {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


app.listen(API_PORT, function () {
    console.log("Server is running on Port: " + API_PORT);
})