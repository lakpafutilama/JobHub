const Joi = require("joi");
const { resPattern } = require("../handler/responseHandler");
const { getUserFromEmail } = require("../services/userService");

const schema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain alphanumeric (upper and lower case) and special character",
    })
    .required(),
  role: Joi.string().valid("user", "organization").required(),
});

exports.signupValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      errors: { wrap: { label: false } },
    });
    const check = await getUserFromEmail(req.body.email);
    if (check) throw "Email already in use";

    next();
  } catch (error) {
    const errorMessage = error.details ? error.details[0].message : error;
    res.status(422).json(resPattern(errorMessage, res.statusCode));
  }
};
