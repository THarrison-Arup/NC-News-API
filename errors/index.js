exports.handle400 = (err, req, res, next) => {
  console.log(err,'<--400 err');
  const codes = ['22P02']
  if (err === 400|| codes.includes(err.code)) res.status(400).send({ msg: 'Bad Request ID'});
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  console.log(err,'<--404 err');
  if (err === 404) res.status(404).send({msg: 'Endpoint does not exist'});
  else next(err);
};

exports.routeNotFound = (req, res) => {
  console.log(req, res, '<--route error');
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  console.log(req, res,'<-- method error');
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
