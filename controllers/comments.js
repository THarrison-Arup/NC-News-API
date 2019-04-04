const { fetchComments, updateComment } = require("../models/comments");

exports.sendComments = (req, res, next) => {
  fetchComments(req.query).then(comments => {
    res.status(200).send({ comments });
  });
};

exports.sendCommentById = (req, res, next) => {
  res.status(200).end();
};

exports.updateCommentById = (req, res, next) => {
  updateComment(req.params, req.body).then(([comment]) => {
    res.status(201).send({ comment });
  });
};

exports.removeCommentById = (req, res, next) => {
  res.status(204).end();
};
