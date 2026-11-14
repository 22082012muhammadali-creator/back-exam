const { Schema, model } = require("mongoose");

const reason_lidSchema = new Schema({
  reason_lid: { type: String, default: "" },
});
const reason_lid = model("reason_lid", reason_lidSchema);
module.exports = { reason_lid };
