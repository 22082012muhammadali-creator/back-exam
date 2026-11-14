const { Schema, model } = require("mongoose");

const stuffSchema = new Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  login: { type: String, default: "" },
  parol: { type: String, default: "" },
  is_active: { type: Boolean, default: "false" }
});
const Stuff = model("Stuff", stuffSchema);
module.exports = { Stuff };