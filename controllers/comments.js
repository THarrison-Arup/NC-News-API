const { fetchComments } = require("../models/comments");

exports.sendComments = (req, res, next) => {
  fetchComments(req.query).then(comments => {
    res.status(200).send({ comments });
  });
};
