const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport')
const path=require("path");


const API_PORT = process.env.API_PORT || 8080;

// Requiring the `Document` model for accessing the `documents` collection
const Documents = require('../backend/models/Documents');
// Requiring the `User` model for accessing the `users` collection
const User = require('../backend/models/User');

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
//     })

//   }

const app = express();
app.use(cors());
const router = express.Router();

//this is our MongoDB database
const dbRoute = "mongodb+srv://auth_user:Openwater_19@cluster0-ot0uy.mongodb.net/test?retryWrites=true";

//connects our back end code with the database
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true
    }
);


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

// this method queries DB and returns on document
router.get('/getDoc:', (req, res) => {
    let id = req.params._id
    alert(`Our request ID param: ${id}`);

    Documents.findOne({ _id: ObjectId(`${id}`) }, (err, post) => {
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
  const { _id, content } = req.body;
  Documents.findOneAndUpdate({_id: _id}, {$set:{content: content}}, {new: true}, (err, doc)=> {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/savetext", (req, res) => {
    let data = new Documents();
    const {title, content} = req.body;

    data.title = title;
    data.content = content;
    data.save((err, responseObject) => {
        // console.log(responseObject);
        // let document_id = responseObject._id;
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            // gets data id of new document and sends to App.js in response object
            // _id: document_id,
        });
    })
});

app.listen(API_PORT, function () {
    console.log("Server is running on Port: " + API_PORT);
});