const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BlogSchema = new Schema({
  blogText: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tblUSer",
    required: true,
  },

  title: {
    required: true,
    type: String,
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Blog", BlogSchema);
