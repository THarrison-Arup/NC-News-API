const { fetchArticles } = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  fetchArticles(req.query).then((articles) => {
    res.status(200).send({ articles });
  });
};
