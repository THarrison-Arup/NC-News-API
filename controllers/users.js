const { fetchUsers, fetchUserById } = require("../models/users");

exports.sendUsers = (req, res, next) => {
  fetchUsers(req.query).then(users => {
    res.status(200).send({ users });
  });
};

exports.sendUserById = (req, res, next) => {
  fetchUserById(req.params).then(([user]) => {
    if (!user) return Promise.reject({ status: 404 });
    res.status(200).send({ user });
  });
};
