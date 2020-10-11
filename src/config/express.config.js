const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const tmp = require('tmp');
const cors = require("cors");
const { ENV } = require('../constant');
// const routes = require('../api/routes/v1');
const error = require('../middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();

// Include CSRF middlewares here
app.use(cors(require('./cors.config')));

// request logging. dev: console 
app.use(morgan("combined",require('./morgan.config')(ENV)));

// This middleware take care of the origin when the origin is undefined.
// origin is undefined when request is local
app.use((req, _, next) => {
	req.headers.origin = req.headers.origin || req.headers.host;
	next();
});

// parse body params and attache them to req.body
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// secure apps by setting various HTTP headers
app.use(helmet());

// mount api v1 routes
// app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// temporary files created using tmp will be deleted on UncaughtException
tmp.setGracefulCleanup();

module.exports = app;
