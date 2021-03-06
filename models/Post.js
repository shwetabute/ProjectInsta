const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref:"profile"
  },
  text: {
    type: String,
    required: false 
  },
  postimage: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  profilePic: {
    type:String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  savePost:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      profilePic: {
        type:String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },

  ProfilePic: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
