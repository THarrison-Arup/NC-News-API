const express = require('express');
const apiRouter = require('./routes/api');
const topicsRouter = require('./routes/topics');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use('/api/topics', topicsRouter);

app.all('/*', routeNotFound);

app.use(handle500);

module.exports = app;
