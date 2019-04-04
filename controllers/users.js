const { fetchUsers } = require("../models/users");

exports.sendUsers = (req, res, next) => {
  fetchUsers(req.query).then(users => {
    res.status(200).send({ users });
  });
};

exports.sendUserById = (req, res, next) => {
  res.status(200).end();
};
