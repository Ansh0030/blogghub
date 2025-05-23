const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "tblUSer",
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  imageUrl: {
    type: Schema.Types.ObjectId,
    ref: "imagePath",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
