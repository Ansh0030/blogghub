const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagePath = new Schema({
  path: {
    type: String,
    require: true,
  },
  username: { type: String, required: true },
});

module.exports = mongoose.model("imagePath", imagePath);
