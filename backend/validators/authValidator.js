const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),
});

exports.authValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    next(err);
  }
};
