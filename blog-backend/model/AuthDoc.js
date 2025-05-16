const mongooes = require("mongoose");

const authSchema = new mongooes.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  password: {
    type: String,
    min: 8,
    unique: true,
  },
});

module.exports = mongooes.model("tblUSer", authSchema);
