const Joi = require('joi');

const createStuffValidationSchema = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  phone_number: Joi.number().optional(),
  login: Joi.string().optional(),
  parol: Joi.string().optional(),
  is_active: Joi.boolean().optional()
});

const updateStuffValidationSchema = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  phone_number: Joi.number().optional(),
  login: Joi.string().optional(),
  parol: Joi.string().optional(),
  is_active: Joi.boolean().optional()
});

module.exports = {
  createStuffValidationSchema,
  updateStuffValidationSchema
};