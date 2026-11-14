const Joi = require('joi');

const createStudentsValidationSchema = Joi.object({
  lid_id: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  bithday: Joi.string().optional(),
  gender: Joi.string().optional()
});

const updateStudentsValidationSchema = Joi.object({
  lid_id: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  bithday: Joi.string().optional(),
  gender: Joi.string().optional()
});

module.exports = {
  createStudentsValidationSchema,
  updateStudentsValidationSchema
};
