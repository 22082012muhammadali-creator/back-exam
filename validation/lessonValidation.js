const Joi = require('joi');

const createLessonValidationSchema = Joi.object({
  lesson_theme: Joi.string().optional(),
  lesson_nuber: Joi.string().optional(),
  group_id: Joi.string().optional(),
  lesson_date: Joi.string().optional()
});

const updateLessonValidationSchema = Joi.object({
  lesson_theme: Joi.string().optional(),
  lesson_nuber: Joi.string().optional(),
  group_id: Joi.string().optional(),
  lesson_date: Joi.string().optional()
});

module.exports = {
  createLessonValidationSchema,
  updateLessonValidationSchema
};
