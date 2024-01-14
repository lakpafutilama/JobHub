const { User } = require("../config/database");

async function authenticateUser(req, res, ext) {
  res.send("hello");
}

module.exports = { authenticateUser };
