const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    desc: "User name",
    type: String,
    required: true,
  },
  surname: {
    desc: "User surname",
    type: String,
    required: true,
  },
  email: {
    desc: "User email",
    type: String,
    required: true,
    unique: true,
  },
  password: {
    desc: "User password",
    type: String,
    required: true,
  },
  role: {
    desc: "User role",
    type: String,
    required: true,
    default: "member",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
