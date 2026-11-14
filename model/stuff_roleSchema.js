const { Schema, model } = require("mongoose");
const { Stuff } = require("./stuffSchema");
const { Role } = require("./roleSchema");

const stuff_roleSchema = new Schema({
  stuff_id: { type: Schema.Types.ObjectId, ref: Stuff, required: true },
  role_id: { type: Schema.Types.ObjectId, ref: Role, required: true },
});

const StuffRole = model("stuffrole", stuff_roleSchema);
module.exports = { StuffRole };