const { Schema, model } = require("mongoose");
const { Stage } = require("./stageSchema");
const { Group } = require("./groupSchema");
const { Lid_status } = require("./lid_statusSchema");
const { reason_lid } = require("./reason_lidSchema");

const lidSchema = new Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  lid_stage_id: { type: Schema.Types.ObjectId, ref: Stage, default: "" },
  test_date: { type: String, default: "" },
  trial_lesson_date: { type: String, default: "" },
  trial_lesson_time: { type: String, default: "" },
  trial_lesson_group_id: { type: Schema.Types.ObjectId, ref: Group, default: "" },
  lid_status_id: { type: Schema.Types.ObjectId, ref: Lid_status, default: "" },
  cancel_reson_id: { type: Schema.Types.ObjectId, ref: reason_lid, default: "" },
});
const Lid = model("Lid", lidSchema);
module.exports = { Lid };
