const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: false
  },
  postimage: {
    type: String,
    required:true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
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
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
  // savepost: [
  //   {
  //     image: {
  //       type: String
  //     },
  //     text: {
  //       type: String
  //     }
  //   }
  // ]
});

module.exports = Post = mongoose.model("post", PostSchema);
