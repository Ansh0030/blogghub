const express = require("express");
const router = express.Router();

const {createBlog, getAllBlogs, deleteBlog, getAuthorBlogs, getBlog} = require("../service/blogService");

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.post("/blogs/author", getAuthorBlogs);
router.get("/blogs/:id", getBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
