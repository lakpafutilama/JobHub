const { resPattern } = require("../handler/responseHandler");
const { decodeJWT } = require("../helpers/generateToken");
const { getUserFromUsername } = require("../services/userService");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.cookie;
  if (!token)
    return res
      .status(422)
      .json(resPattern("Token not provided", res.statusCode));

  const user = decodeJWT(token);
  const userDetails = await getUserFromUsername(user.username);
  if (!userDetails)
    return res.status(400).json(resPattern("User not found", res.statusCode));
  next();
};
