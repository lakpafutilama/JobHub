exports.verifyToken = (req, res, next) => {
  const bearerToken = req.headers["token"];
  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    req.token = token;
    next();
  } else {
    const err = new Error("Token is not valid");
    err.statusCode = 401;
    next(err);
  }
};
