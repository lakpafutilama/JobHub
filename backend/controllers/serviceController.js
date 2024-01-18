exports.homePage = (req, res, next) => {
  try {
    res.send("home");
  } catch (err) {
    next(err);
  }
};
