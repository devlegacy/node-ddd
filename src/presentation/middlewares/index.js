const createError = require('http-errors');
const { NODE_ENV } = require('../../config/environments');
const boom = require('@hapi/boom');

function withErrorStack(error, stack) {
  if (NODE_ENV !== 'production') {
    return { ...error, stack };
  }

  return { error };
}

module.exports.error404 = (req, res, next) => {
  // next(createError(404));
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
};

module.exports.logError = function (err, req, res, next) {
  console.log(err);
  next(err);
};

module.exports.wrapError = function (err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
};

module.exports.generalErrorHandler = function (err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  // render the error page
  res.status(statusCode);
  if (!req.get('Content-Type').includes('application/json')) {
    // set locals, only providing error in development
    res.locals.message = payload;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
  } else {
    res.json(withErrorStack(payload, err.stack));
  }
};

/**
Middleware: Pieza de software que esta en medio de otras dos. Conocido como software glue/pegamento
En express los middlewares se identifican bajo una firma/contrato

function (req, res, next) {}

*/
