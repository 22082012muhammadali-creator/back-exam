const Joi = require('joi');

const createGroupValidationSchema = Joi.object({
  group_name: Joi.string().optional(),
  lesson_start_time: Joi.string().optional(),
  lesson_continuous: Joi.string().optional(),
  lesson_week_day: Joi.string().optional(),
  group_stage_idint: Joi.string().optional(),
  room_number: Joi.string().optional(),
  room_floor: Joi.number().optional(),
  branch_id: Joi.string().optional(),
  lessons_quant: Joi.string().optional(),
  is_active: Joi.boolean().optional()
});

const updateGroupValidationSchema = Joi.object({
  group_name: Joi.string().optional(),
  lesson_start_time: Joi.string().optional(),
  lesson_continuous: Joi.string().optional(),
  lesson_week_day: Joi.string().optional(),
  group_stage_idint: Joi.string().optional(),
  room_number: Joi.string().optional(),
  room_floor: Joi.number().optional(),
  branch_id: Joi.string().optional(),
  lessons_quant: Joi.string().optional(),
  is_active: Joi.boolean().optional()
});

module.exports = {
  createGroupValidationSchema,
  updateGroupValidationSchema
};
