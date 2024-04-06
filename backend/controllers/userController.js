const { resPattern } = require("../handler/responseHandler");
const {
  generateJWT,
  decodeJWT,
  generatePass,
} = require("../helpers/generateToken");

const {
  saveUser,
  getUserFromEmail,
  deleteUserByUsername,
  countUsers,
} = require("../services/userService");

async function registerUser(req, res, next) {
  try {
    const userData = req.body;
    userData.username = await generateUsername(userData.full_name);
    userData.password = generatePass(userData.password);
    await saveUser(userData);
    const token = generateJWT({ username: userData.username });
    res.status(200).json(resPattern(token, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function authenticateUser(req, res, next) {
  try {
    const payload = req.body;
    const check = await getUserFromEmail(payload.email);
    if (!check)
      return res.status(400).json(resPattern("User not found", res.statusCode));

    const oldPass = decodeJWT(check.password);
    if (payload.password != oldPass)
      return res.status(422).json(resPattern("Wrong password", res.statusCode));

    const token = generateJWT({ username: payload.username });
    res.status(200).json(resPattern(token, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function generateUsername(fullname) {
  const full_name = fullname.split(" ");
  const username = `${full_name[0]}.${
    full_name[full_name.length - 1]
  }`.toLowerCase();
  const count = await countUsers(username);
  return count == 0 ? username : `${username}${count}`;
}

async function deleteUser(req, res, next) {
  const username = req.params.username;
  await deleteUserByUsername(username);
  res.status(200).json(resPattern(`${username} deleted`, res.statusCode));
}

module.exports = { registerUser, authenticateUser, deleteUser };
