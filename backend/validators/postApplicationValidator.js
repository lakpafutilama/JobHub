const Joi = require("joi");
const { resPattern } = require("../handler/responseHandler");

const schema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
});

exports.postApplicationValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      errors: { wrap: { label: false } },
    });

    next();
  } catch (error) {
    const errorMessage = error.details
      ? error.details[0].message
      : "Validation error";
    res.status(422).json(resPattern(errorMessage, res.statusCode));
  }
};
