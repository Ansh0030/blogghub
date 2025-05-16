const tblUSer = require("../model/AuthDoc");
const Comment = require("../model/CommentDoc");

const createComment = async (req, res) => {
  try {
    const { text, username, blogId } = req.body;

    const user = await tblUSer.findOne({ _id: username });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    let comment = await Comment.create({
      text,
      author: user._id,
      blogId,
    });

    // Populate the author field after creation
    comment = await Comment.findById(comment._id).populate("author");

    res.status(200).json({ comment });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getComments = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ blogId })
      .populate("author")
      .sort({ createdAt: -1 });
    console.log(comments);
    if (comments.length <= 0) {
      return res.status(400).send(comments, { message: "Comment not found" });
    }
    res.status(200).json({ comments });
  } catch (e) {
    console.log(e);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const deltetedComm = await Comment.findOne({ _id: commentId });
    if (!deltetedComm) {
      return res.status(400).send({ message: "Comment not found" });
    }
    await Comment.deleteOne({ _id: commentId });
    res.status(200).json({ deltetedComm });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createComment, getComments, deleteComment };
