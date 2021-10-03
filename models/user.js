const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: false },
});
module.exports = mongoose.model("users", userSchema);