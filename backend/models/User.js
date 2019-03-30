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


module.exports = mongoose.model("User", UserSchema);