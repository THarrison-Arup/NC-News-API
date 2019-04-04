const {
  fetchComments,
  updateComment,
  removeComment,
  fetchCommentById
} = require("../models/comments");

exports.sendComments = (req, res, next) => {
  fetchComments(req.query).then(comments => {
    res.status(200).send({ comments });
  });
};

exports.sendCommentById = (req, res, next) => {
  fetchCommentById(req.params)
    .then(([comment]) => {
      if (!comment) return Promise.reject({ status: 404 });
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.updateCommentById = (req, res, next) => {
  updateComment(req.params, req.body).then(([comment]) => {
    res.status(201).send({ comment });
  });
};

exports.removeCommentById = (req, res, next) => {
  removeComment(req.params)
    .then(comments => {
      res.status(204).send({ comments });
    })
    .catch(next);
};
