var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* Lidet */
/* added this reference to Documents Schema */
const Documents = require('./Documents');

/* Users */
var UserSchema = new Schema({
  name: {
      type: String
  },
  password: {
        type: String,
  },
  email: {
       type: String,
  },
})

/* Lidet */
/* changed all references of 'userSchema' to 'UserSchema' */
UserSchema.methods.getOwnedDocuments = function (callback){
  var userid = this._id;
  Documents.find({author: userid}).populate('author').populate('collaborators')
  .exec(function(err,documents){
      console.log('documents owned by user are are ', documents);
    callback(err,documents);
  })
}

UserSchema.methods.getCollaboratedDocuments = function (callback){
  var userid = this._id;
  Document.find({author: {$nin: [userid]}, collaborators: {$all: [userid]}}).populate('author').populate('collaborators')
  .exec(function(err,documents){
      console.log('documents only collaborate are ', documents);
    callback(err,documents);
  })
}

UserSchema.methods.getAllDocuments = function (callback){
  var userid = this._id;
  Document.find({collaborators: {$all: [userid]}}).populate('collaborators').populate('author')
  .exec(function(err,documents){
      console.log('documents are ', documents);
    callback(err,documents);
  })
}


module.exports = mongoose.model("User", UserSchema);