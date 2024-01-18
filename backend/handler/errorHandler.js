const { resPattern } = require("./responseHandler");

exports.errorHandler = (err, req, res, next) => {
  res.status(err.code ?? 500).json(resPattern(err, res.statusCode));
};
