const { resPattern } = require("../handler/responseHandler");
const { decodeJWT } = require("../helpers/generateToken");
const { getUserFromUsername } = require("../services/userService");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res
      .status(422)
      .json(resPattern("Token not provided", res.statusCode));

  const user = decodeJWT(token);
  if (!user)
    return res.status(422).json(resPattern("Invalid token", res.statusCode));
  const userDetails = await getUserFromUsername(user.username);
  if (!userDetails)
    return res.status(400).json(resPattern("User not found", res.statusCode));
  global._user = userDetails;
  next();
};
