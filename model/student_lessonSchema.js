const { Schema, model } = require("mongoose");
const { Lesson } = require("./lessonSchema");
const { Students } = require("./studentsSchema");

const student_lessonSchema = new Schema({
  lesson_id: { type: Schema.Types.ObjectId, ref: Lesson, default: "" },
  student_id: { type: Schema.Types.ObjectId, ref: Students, default: "" },
  is_there: { type: String, default: "" },
  reason: { type: String, default: "" },
  be_paid: { type: String, default: "" }
});
const Student_Lesson = model("Student_Lesson", student_lessonSchema);
module.exports = { Student_Lesson };
