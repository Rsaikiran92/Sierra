const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unquie: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

exports.userModel = userModel;
