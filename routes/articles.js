const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const {
  sendArticles,
  sendArticleById,
  updateArticleById
} = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticleById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
