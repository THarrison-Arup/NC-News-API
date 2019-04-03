const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const {
  sendArticles,
  sendArticleById,
  updateArticleById,
  removeArticleById,
  sendCommentsByArticleId
} = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticleById)
  .delete(removeArticleById)
  .all(methodNotAllowed);

articlesRouter 
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId);

module.exports = articlesRouter;
