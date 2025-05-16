const Blog = require("../model/blogsDoc");
const tblUSer = require("../model/AuthDoc");

const createBlog = async (req, res) => {
  try {
    const { blogText, username, title } = req.body;
    const user = await tblUSer.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    } else {
      const newBlog = new Blog({
        blogText,
        author: user._id,
        title,
      });
      await newBlog.save();
      return res
        .status(201)
        .json({ newBlog, message: "Blog created successfully." });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author").sort({ createdAt: -1 });
    if (!blogs) {
      return res.status(400).json({ message: "Blog not found" });
    }
    res.json({ blogs });
  } catch (e) {
    console.log(e);
  }
};

const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findOne({ _id: blogId });
    res.status(200).json({ blog });
  } catch (e) {
    console.log(e);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const delBlog = await Blog.deleteOne({ _id: blogId });
    res.status(200).json({ delBlog });
  } catch (e) {
    console.log(e);
  }
};

const getAuthorBlogs = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await tblUSer.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const blogs = await Blog.find({ author: user._id })
      .populate("author")
      .sort({ createdAt: -1 });
    if (blogs.length <= 0) {
      return res.status(400).json({ message: "Blog not found" });
    }
    res.status(200).json({ blogs });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getAuthorBlogs,
  getBlog,
};
