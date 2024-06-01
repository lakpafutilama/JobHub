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
  updateUser,
} = require("../services/userService");
const { uploadImage } = require("../middleware/upload");

async function registerUser(req, res, next) {
  try {
    const userData = req.body;
    userData.gender = "male";
    userData.contact = "";
    userData.username = await generateUsername(userData.full_name);
    userData.password = generatePass(userData.password);
    await saveUser(userData);
    const token = generateJWT({
      username: userData.username,
      role: userData.role,
    });
    res
      .status(200)
      .json(resPattern({ token, role: userData.role }, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function authenticateUser(req, res, next) {
  try {
    const payload = req.body;
    const check = await getUserFromEmail(payload.email);
    if (!check)
      return res
        .status(400)
        .json(
          resPattern(
            "User not found!!! \nPlease signup to proceed",
            res.statusCode
          )
        );

    const oldPass = decodeJWT(check.password);
    if (payload.password != oldPass)
      return res.status(422).json(resPattern("Wrong password", res.statusCode));

    const token = generateJWT({ username: check.username, role: check.role });
    res
      .status(200)
      .json(resPattern({ token, role: check.role }, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function generateUsername(fullname) {
  try {
    const full_name = fullname.split(" ");
    const username = `${full_name[0]}.${
      full_name[full_name.length - 1]
    }`.toLowerCase();
    const count = await countUsers(username);
    return count == 0 ? username : `${username}${count}`;
  } catch (err) {
    next(err);
  }
}

async function editUser(req, res, next) {
  try {
    const id = global._user._id;
    const data = {
      full_name: req.body.full_name,
      gender: req.body.gender,
      contact: req.body.contact,
    };
    await updateUser(id, req.body);
    res.status(200).json(resPattern(`Updated`, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function editPP(req, res, next) {
  try {
    const data = await uploadImage(req.file.path);
    const id = global._user._id;
    const result = {
      pp: data.secure_url,
    };
    await updateUser(id, result);
    res
      .status(200)
      .json(resPattern(`Uploaded profile picture`, res.statusCode));
  } catch (err) {
    console.log(err);
    next(err.message);
  }
}

async function deleteUser(req, res, next) {
  try {
    const username = req.params.username;
    await deleteUserByUsername(username);
    res.status(200).json(resPattern(`${username} deleted`, res.statusCode));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerUser,
  authenticateUser,
  editUser,
  editPP,
  deleteUser,
};
