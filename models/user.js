const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userEmail: String,
    userFirstname: String,
    userLastname: String,

    userPassword: String,
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
