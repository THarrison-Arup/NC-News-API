const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users");

var endpointsJSON = require("../endpoints.json")

const sendEndpoints = (req, res, next) => {
  res.status(200).send({ msg: endpointsJSON });
};

apiRouter
  .route("/")
  .get(sendEndpoints)
  .all(methodNotAllowed);

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
