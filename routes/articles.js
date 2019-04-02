const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route('/')
  .get((req, res) => {
    res.send({ msg: "OK from the articles router" });
  })
  .all(methodNotAllowed);

module.exports = articlesRouter;
