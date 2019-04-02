const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

topicsRouter
  .route('/')
  .get((req, res) => {
    res.send({ msg: "OK from the topics router" })
  })
  .all(methodNotAllowed);

module.exports = topicsRouter;
