const { fetchArticles, fetchArticleById } = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  fetchArticles(req).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.sendArticleById = (req, res, next) => {
  fetchArticleById(req.params).then(([article]) => {
    res.status(200).send({ article });
  });
};
