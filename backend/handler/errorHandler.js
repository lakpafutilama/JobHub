const { resPattern } = require("./responseHandler");

exports.errorHandler = (error, req, res, next) => {
  res.status(error.code ?? 500).json(resPattern(error, res.statusCode));
};
