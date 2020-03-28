const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  savepost: [
    {
      image: {
        type: String
      },
      text: {
        type: String
      }
    }
  ]
});
module.exports = UserModel = mongoose.model("users", userSchema);
