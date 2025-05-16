const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagePath = new Schema({
  path: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "tblUSer",
  },
});

module.exports = mongoose.model("imagePath", imagePath);
