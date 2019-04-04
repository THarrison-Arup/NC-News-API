const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const { sendComments, sendCommentById } = require("../controllers/comments");

commentsRouter
  .route("/")
  .get(sendComments)
  .all(methodNotAllowed);

commentsRouter
  .route("/:comment_id")
  .get(sendCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
