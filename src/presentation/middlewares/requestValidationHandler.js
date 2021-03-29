const boom = require('@hapi/boom');

function validate(data, schema) {
  const { error, value } = schema.validate(data);
  // console.log(value);
  return error;
}

function requestValidationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const err = validate(req[check], schema);

    err ? next(boom.badRequest(err)) : next();
  };
}
module.exports = requestValidationHandler;
