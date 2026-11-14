const { Schema, model } = require("mongoose");
const { Students } = require("./studentsSchema");
const { Group } = require("./groupSchema");

const student_groupSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: Students, default: "" },
  group_id: { type: Schema.Types.ObjectId, ref: Group, default: "" }
});
const Student_Group = model("Student_Group", student_groupSchema);
module.exports = { Student_Group };
