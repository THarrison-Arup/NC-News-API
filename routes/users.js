const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const {} = require("../controllers/users");

usersRouter
  .route("/")
  .get()
  .all(methodNotAllowed);

  module.exports = usersRouter;