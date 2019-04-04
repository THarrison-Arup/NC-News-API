const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const { sendComments, sendCommentById, updateCommentById, removeCommentById } = require("../controllers/comments");

commentsRouter
  .route("/")
  .get(sendComments)
  .all(methodNotAllowed);

commentsRouter
  .route("/:comment_id")
  .get(sendCommentById)
  .patch(updateCommentById)
  .delete(removeCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
