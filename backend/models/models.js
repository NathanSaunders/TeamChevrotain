var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Users */
var userSchema = new Schema({
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

var User = mongoose.model('User', userSchema);


userSchema.methods.getOwnedDocuments = function (callback){
  var userid = this._id;
  Documents.find({author: userid}).populate('author').populate('collaborators')
  .exec(function(err,documents){
      console.log('documents owned by user are are ', documents);
    callback(err,documents);
  })
}

userSchema.methods.getCollaboratedDocuments = function (callback){
  var userid = this._id;
  Documents.find({author: {$nin: [userid]}, collaborators: {$all: [userid]}}).populate('author').populate('collaborators')
  .exec(function(err,documents){
      console.log('documents only collaborate are ', documents);
    callback(err,documents);
  })
}

userSchema.methods.getAllDocuments = function (callback){
  var userid = this._id;
  Documents.find({collaborators: {$all: [userid]}}).populate('collaborators').populate('author')
  .exec(function(err,documents){
      console.log('documents are ', documents);
    callback(err,documents);
  })
}





/* Documents */
var documentSchema = new Schema({
    // title: {
    //     type: String,
    //     default: 'Untitled Document'
    // },
  // author: {
  //    type: mongoose.Schema.Types.ObjectId,
  //    ref: 'User'
  // },
  // collaborators: [{
  //       type: mongoose.Schema.ObjectId,
  //       ref: 'User'
  // }],
  content: String,
  // shareLink: String,
  // password: {
  //        type: String,
  // },
  // dateCreated: String,
  // contentHistory: []
})

var Documents = mongoose.model('Documents', documentSchema);

/* added */
// documentSchema.methods.postNewDocument = function (callback) {
// }

module.exports = {
  User: User,
  Documents: Documents
 };
