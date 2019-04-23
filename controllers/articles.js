const {
  fetchArticles,
  fetchArticleById,
  updateArticle,
  removeArticle,
  fetchCommentsByArticleId,
  addComment
} = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      if (!articles)
        return Promise.reject({ status: 404, msg: "Error resource not found" });
      else res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

exports.sendArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(([article]) => {
      console.log(article);
      if (!article) return Promise.reject({ status: 404 });
      else res.status(200).send({ article });
    })
    .catch(err => {
      console.log(err, "<--ERROR");
      next(err);
    });
};

exports.updateArticleById = (req, res, next) => {
  console.log(typeof req.body["inc_votes"]);
  if (typeof req.body["inc_votes"] !== "number") {
    return Promise.reject({ status: 404 });
  } else {
    updateArticle(req.params, req.body)
      .then(([article]) => {
        if (!article) return Promise.reject({ status: 404 });
        else res.status(200).send({ article });
      })
      .catch(err => {
        console.log(err.status, "<-- ERROR");
        next(err);
      });
  }
};

exports.removeArticleById = (req, res, next) => {
  removeArticle(req.params)
    .then(articles => {
      res.status(204).send({ articles });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  fetchCommentsByArticleId(req.params, req.query).then(comments => {
    res.status(200).send({ comments });
  });
};

exports.updateCommentByArticleId = (req, res, next) => {
  addComment(req.params, req.body).then(([comment]) => {
    res.status(201).send({ comment });
  });
};
