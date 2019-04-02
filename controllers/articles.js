const { fetchArticles, fetchArticleById } = require("../models/articles");

exports.sendArticles = (req, res, next) => {
// const { author, topic, sort_by, order } = req.query
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

};