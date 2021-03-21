const { config } = require('../config/environment');
const createError = require('http-errors');

module.exports.error404 = (req, res, next) => {
  next(createError(404));
};

function withErrorStack(error, stack) {
  if (config.development) {
    return { error, stack };
  }

  return { error };
}

module.exports.logError = function (err, req, res, next) {
  console.log(err);
  next(err);
};

module.exports.generalErrorHandler = function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  if (!req.get('Content-Type').includes('application/json')) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
  } else {
    res.json(withErrorStack(err.message, err.stack));
  }
};
