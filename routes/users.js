const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const { sendUsers } = require("../controllers/users");

usersRouter
  .route("/")
  .get(sendUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;
