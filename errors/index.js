exports.handle400 = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request ID" });
  } else if (err.status === 400) {
    res.status(400).send({ msg: "Bad Request ID" });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === "42703") {
    res.status(200).send({ msg: "Sort query is invalid" });
  } else if (err.status === 404) {
    res.status(404).send({ msg: "Endpoint does not exist" });
  } else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
