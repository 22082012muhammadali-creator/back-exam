const Joi = require('joi');

const createStudentGroupValidationSchema = Joi.object({
  student_id: Joi.string().optional(),
  group_id: Joi.string().optional()
});

const updateStudentGroupValidationSchema = Joi.object({
  student_id: Joi.string().optional(),
  group_id: Joi.string().optional()
});

module.exports = {
  createStudentGroupValidationSchema,
  updateStudentGroupValidationSchema
};
