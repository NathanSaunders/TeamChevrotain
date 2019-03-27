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
// ==================added Lidetu===================
io.on('connection', (socket) => {
    // console.log('a user connected'); 
    //listen for joined events when users enter
    socket.on('joined', ({doc, user}) => {
  
        socket.join(doc) //give join the string name of the room, this joins that room
        console.log(io.nsps['/'].adapter.rooms[doc].length);
        if(io.nsps['/'].adapter.rooms[doc].length >= 6) {
          socket.emit('redirect');
          return;
        }
  
        console.log('user has joined a room', doc);
        socket.emit('welcome', {doc}) //emit back to the sending user
        //create a new key on the socket object with information you want to be accessible in all the handlers
        socket.documentRoom = doc; 
  
        online.push(user);
        online[online.length - 1].color = colors[online.length - 1];
        online = _.uniq(online, '_id');
  
        io.to(doc).emit('onlineUpdated', {online});
        //broadcast a userjoined event to everyone but sender that is in the room named doc
        socket.broadcast.to(doc).emit('userjoined');
  
    })
  
  socket.on('newContent', stringifiedContent => {
      socket.broadcast.to(socket.documentRoom).emit('receivedNewContent', stringifiedContent)
  })
  
  socket.on('newContentHistory', contentHistory => {
    console.log("In socket");
    io.to(socket.documentRoom).emit('receivedNewContentHistory', contentHistory);
  })
  
  socket.on('cursorMove', selection => {
      socket.broadcast.to(socket.documentRoom).emit('receiveNewCursor', selection)
  })
  
    socket.on('disconnect', ({userleft}) => {
      if(!userleft) {
        return;
      }
      console.log('user disconnected');
      var index = 0;
      for(var i = 0; i < online.length; i++) {
        if(online[i] === userleft._id) {
          index = i;
          break;
        }
      }
      online.splice(index, 1);
      //leave the room, get the doc from the key we stored on the socket
      socket.leave(socket.documentRoom) 
      io.to(doc).emit('onlineUpdated', {online});
      socket.broadcast.to(socket.documentRoom).emit('userleft') //emit to all other users in room that user has left
    });
  
    socket.on('limit', () => {
      window.location.href = '/';
    });
  
  });