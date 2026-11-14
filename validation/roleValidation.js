const Joi = require('joi');

const createRoleValidationSchema = Joi.object({
  name: Joi.string()
});

const updateRoleValidationSchema = Joi.object({
  name: Joi.string()
});

module.exports = {
  createRoleValidationSchema,
  updateRoleValidationSchema
};