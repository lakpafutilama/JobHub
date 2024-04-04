const { resPattern } = require("../handler/responseHandler");

exports.homePage = (req, res, next) => {
  try {
    res.json(resPattern("home", res.statusCode));
  } catch (err) {
    next(err);
  }
};
