const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const { sendUsers, sendUserById } = require("../controllers/users");

usersRouter
  .route("/")
  .get(sendUsers)
  .all(methodNotAllowed);

usersRouter
  .route("/:username")
  .get(sendUserById)
  .all(methodNotAllowed);

module.exports = usersRouter;
