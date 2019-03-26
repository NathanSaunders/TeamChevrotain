var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's Documenets data structure 
const DocumentsSchema = new Schema(
    {
    title: {
        type: String,
        default: 'Untitled Document'
    },
//   author: {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'User'
//   },
//   collaborators: [{
//         type: mongoose.Schema.ObjectId,
//         ref: 'User'
//   }],
  content: String,
  // shareLink: String,
  // password: {
  //        type: String,
  // },
  // dateCreated: String,
  // contentHistory: []
})

DocumentsSchema.methods.update =  function(query, updateData, cb) { 
    this.findOneAndUpdate(query, 
        {$set: updateData},{new: true}, cb);
}

module.exports = mongoose.model("Documents", DocumentsSchema);
