const Joi = require('joi');

const createLidStatusValidationSchema = Joi.object({
  status: Joi.string().optional()
});

const updateLidStatusValidationSchema = Joi.object({
  status: Joi.string().optional()
});

module.exports = {
  createLidStatusValidationSchema,
  updateLidStatusValidationSchema
};
