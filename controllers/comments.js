const {sendComments} = require("../models/comments");

exports.sendComments = (req, res, next) => {
  res.status(200).end();
};