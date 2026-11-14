const Joi = require('joi');

const createLidValidationSchema = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  lid_stage_id: Joi.string().optional(),
  test_date: Joi.string().optional(),
  trial_lesson_date: Joi.string().optional(),
  trial_lesson_time: Joi.string().optional(),
  trial_lesson_group_id: Joi.string().optional(),
  lid_status_id: Joi.string().optional(),
  cancel_reson_id: Joi.string().optional()
});

const updateLidValidationSchema = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  lid_stage_id: Joi.string().optional(),
  test_date: Joi.string().optional(),
  trial_lesson_date: Joi.string().optional(),
  trial_lesson_time: Joi.string().optional(),
  trial_lesson_group_id: Joi.string().optional(),
  lid_status_id: Joi.string().optional(),
  cancel_reson_id: Joi.string().optional()
});

module.exports = {
  createLidValidationSchema,
  updateLidValidationSchema
};
