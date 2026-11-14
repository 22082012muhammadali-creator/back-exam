const { Schema, model } = require("mongoose");
const { Group } = require("./groupSchema");

const lessonSchema = new Schema({
  lesson_theme: { type: String, default: "" },
  lesson_nuber: { type: String, default: "" },
  group_id: { type: Schema.Types.ObjectId, ref: Group, default: "" },
  lesson_date: { type: String, default: "" },
});
const Lesson = model("Lesson", lessonSchema);
module.exports = { Lesson };
