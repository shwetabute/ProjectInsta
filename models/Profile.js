const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  handle: {
    type: String,
    required: true,
    max: 40
  },

  website: {
    type: String,
    required: false
  },

  bio: {
    type: String
  },

  //These are additional fields
  location: {
    type: String,
    required: false
  },
  phonenumber: {
    type: String,
    required: false
  },

  gender: {
    type: String,
    required: false
  },
  

  profilePic: {
    type: String,
    required: false
  },

  followers:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],

  following:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],

  savePost:[
    {
      postId: {
        type: Schema.Types.ObjectId,
        ref: 'post'
      }
    }
  ] 

});
module.exports = Profile = mongoose.model("profile", profileSchema);
