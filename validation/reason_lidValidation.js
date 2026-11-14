const Joi = require('joi');

const createReasonLidValidationSchema = Joi.object({
  reason_lid: Joi.string().optional()
});

const updateReasonLidValidationSchema = Joi.object({
  reason_lid: Joi.string().optional()
});

module.exports = {
  createReasonLidValidationSchema,
  updateReasonLidValidationSchema
};
