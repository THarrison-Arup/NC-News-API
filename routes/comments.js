const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const {sendComments} = require("../controllers/comments");

commentsRouter
  .route("/")
  .get(sendComments)
  .all(methodNotAllowed);

module.exports = commentsRouter;