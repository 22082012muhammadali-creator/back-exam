const { Schema, model } = require("mongoose");
const { Students } = require("./studentsSchema");

const paymentSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: Students, default: "" },
  payment_last_date: { type: String, default: "" },
  payment_date: { type: String, default: "" },
  price: { type: String, default: "" },
  is_paid: { type: String, default: "" },
  total_attent: { type: String, default: "" }
});
const Payment = model("Payment", paymentSchema);
module.exports = { Payment };
