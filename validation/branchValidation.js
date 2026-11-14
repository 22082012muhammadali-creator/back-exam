const Joi = require('joi');

const createBranchValidationSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  call_number: Joi.number().optional()
});

const updateBranchValidationSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  call_number: Joi.number().optional()
});

module.exports = {
  createBranchValidationSchema,
  updateBranchValidationSchema
};