const {
  fetchArticles,
  fetchArticleById,
  updateArticle
} = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  fetchArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.sendArticleById = (req, res, next) => {
  fetchArticleById(req.params).then(([article]) => {
    res.status(200).send({ article });
  });
};

exports.updateArticleById = (req, res, next) => {
  updateArticle(req.params, req.body).then(([article]) => {
    res.status(201).send({ article });
  });
};