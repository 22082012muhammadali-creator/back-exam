const { Schema, model } = require("mongoose");

const lid_statusSchema = new Schema({
  status: { type: String, default: "" },
});
const Lid_status = model("Lid_status", lid_statusSchema);
module.exports = { Lid_status };
