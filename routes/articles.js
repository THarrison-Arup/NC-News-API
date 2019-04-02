const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const {sendArticles, sendArticleById} = require('../controllers/articles')

articlesRouter
  .route('/')
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
