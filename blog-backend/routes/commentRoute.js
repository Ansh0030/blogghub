const express = require('express');
const router = express.Router();
const { createComment, getComments , deleteComment } = require("../service/commentService");

router.post("/comment", createComment);
router.route("/comment/:id")
    .get(getComments)
    .delete(deleteComment);

module.exports = router;