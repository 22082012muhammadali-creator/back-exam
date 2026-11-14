const Joi = require('joi');

const createStageValidationSchema = Joi.object({
  name: Joi.string().optional()
});

const updateStageValidationSchema = Joi.object({
  name: Joi.string().optional()
});

module.exports = {
  createStageValidationSchema,
  updateStageValidationSchema
};