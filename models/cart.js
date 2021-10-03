const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  goodsId: { type: String, required: true, unique: false },
  quantity: {type: Number, required: true, unique: false },
});
module.exports = mongoose.model("carts", cartSchema);