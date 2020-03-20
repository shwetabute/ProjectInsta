const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String
  },
  website: {
    type: String,
    required: false
  },
  bio: {
    type: String
  },
  //These are additional fields
  phonenumber: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: false
  },

  gender: {
    type: String,
    required: false
  }
});
module.exports = Profile = mongoose.model("profile", profileSchema);
