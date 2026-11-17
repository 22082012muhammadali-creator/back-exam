const { Schema, model } = require("mongoose");
const { Group } = require("./groupSchema");
const { Stuff } = require("./stuffSchema");

const group_stuffSchema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: 'Group', default: "" },
  stuff_id: { type: Schema.Types.ObjectId, ref: 'Stuff', default: "" }
});
const group_stuff = model("group_stuff", group_stuffSchema);
module.exports = { group_stuff };
