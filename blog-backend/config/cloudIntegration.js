const express = require("express");
const multer = require("multer");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const ImageUrl = require("../model/imagePath");
const tblUSer = require("../model/AuthDoc");

cloudinary.config({
  cloud_name: "dadtycrya",
  api_key: "846294689664551",
  api_secret: "ZBXkRY-VqWaRVZu5NLW7j6AutE0",
});

const Storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images-folder",
  },
});
const allowedFormatTypes = ["png", "jpeg", "jpg"];

const upload = multer({
  storage: Storage,
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const username = req.body.username;

    const user = await tblUSer.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!file) {
      return res.status(400).json({ error: "File not uploaded" });
    }

    console.log("Uploaded file info:", file);
    console.log("Username:", username);

    const updatedImage = await ImageUrl.findOneAndUpdate(
      { username },
      { path: file.path, userId: user._id },
      { new: true, upsert: true }
    );

    res.status(200).json({
      status: "success",
      fileUrl: updatedImage.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/getImage", async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({
      message: "Username is required",
    });
  }

  const user = await tblUSer.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const getImage = await ImageUrl.findOne({ username });

  // if (!getImage) {
  //   return res.status(404).json({
  //     message: "Image not found",
  //   });
  // }

  return res.status(200).json({
    user,
    getImage,
  });
});

module.exports = router;
