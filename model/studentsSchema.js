const { Schema, model } = require("mongoose");
const { Lid } = require("./lidSchema");

const studentsSchema = new Schema({
  lid_id: { type: Schema.Types.ObjectId, ref: Lid, default: "" },
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  bithday: { type: String, default: "" },
  gender: { type: String, default: "" }
});
const Students = model("Students", studentsSchema);
module.exports = { Students };
