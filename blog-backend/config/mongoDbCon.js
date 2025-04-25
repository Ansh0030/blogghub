const mongooes = require("mongoose");

const uri =
  "mongodb+srv://root:root@express.silay2q.mongodb.net/?retryWrites=true&w=majority&appName=express";

const connectDb = async () => {
  await mongooes.connect(uri);
  console.log("MongoDb connected Successfully with Mongooes!!");
};

module.exports = connectDb;
