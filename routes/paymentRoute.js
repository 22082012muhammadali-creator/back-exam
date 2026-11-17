const { Router } = require("express");
const payment = Router();

const {
  addPayment,
  getPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  searchPayment
} = require("../controllers/payment.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createPaymentValidationSchema,
  updatePaymentValidationSchema,
} = require("../validation/paymentValidation");



/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment uchun API endpointlar
 */

/**
 * @swagger
 * /payment/addPayment:
 *   post:
 *    summary: Yangi Payment qo'shish
 *    tags: [Payment]
 *    description: Yangi Payment yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              student_id:
 *                type: string
 *              payment_last_date:
 *                type: string
 *              payment_date:
 *                type: string
 *              price:
 *                type: string
 *              is_paid:
 *                type: string
 *              total_attent:
 *                type: string
 *    responses:
 *      201:
 *        description: Payment muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
payment.post("/addPayment", validationSchema(createPaymentValidationSchema), addPayment);

/**
 * @swagger
 * /payment/getPayment:
 *   get:
 *     summary: Barcha payment larni olish
 *     tags: [Payment]
 *     description: Barcha payment larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: payment lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.get("/getPayment", getPayment);


/**
 * @swagger
 * /payment/getPaymentById/{id}:
 *   get:
 *     summary: Payment larni ID bo'yicha olish
 *     tags: [Payment]
 *     description: Payment ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.get("/getPaymentById/:id", getPaymentById);

/**
 * @swagger
 * /payment/updatePayment/{id}:
 *   put:
 *     summary: Payment ni yangilash
 *     tags: [Payment]
 *     description: Payment ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *               payment_date:
 *                 type: string
 *               price:
 *                 type: string
 *               is_paid:
 *                 type: string
 *               total_attent:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.put("/updatePayment/:id", validationSchema(updatePaymentValidationSchema), updatePayment);

/**
 * @swagger
 * /payment/deletePayment/{id}:
 *   delete:
 *     summary: Payment ni ID orqali o'chirish
 *     tags: [Payment]
 *     description: Berilgan ID orqali Payment ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Payment ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.delete("/deletePayment/:id", deletePayment);

/**
 * @swagger
 * /payment/searchPayment:
 *   get:
 *     summary: Payment larni qidirish
 *     tags: [Payment]
 *     description: Payment larni price, is_paid, payment_date bo'yicha qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Qidiruv so'rovi
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       '400':
 *         description: Qidiruv so'rovi kiritilmagan
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.get("/searchPayment", searchPayment);

module.exports = { payment };
