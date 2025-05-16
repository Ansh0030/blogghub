const tblUSer = require("../model/AuthDoc");
const Comment = require("../model/CommentDoc");
const imagePath = require("../model/imagePath");
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

    // Get comments with author populated
    const comments = await Comment.find({ blogId })
      .populate("author")
      .sort({ createdAt: -1 });

    // If no comments, return early
    if (!comments.length) {
      return res.status(400).json({ message: "Comment not found" });
    }

    // For each comment, find the user's image path and attach it
    const enrichedComments = await Promise.all(
      comments.map(async (comment) => {
        const image = await imagePath.findOne({ userId: comment.author._id });
        return {
          ...comment.toObject(),
          author: {
            ...comment.author.toObject(),
            imageUrl: image?.path || null,
          },
        };
      })
    );

    res.status(200).json({ comments: enrichedComments });
  } catch (e) {
    console.error("Error fetching comments:", e);
    res.status(500).json({ message: "Server error" });
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
