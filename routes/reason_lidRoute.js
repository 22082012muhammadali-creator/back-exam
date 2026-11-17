const { Router } = require("express");
const reason_lid = Router();

const {
  addReason_lid,
  getReason_lid,
  getReasonLidById,
  updateReasonLid,
  deleteReasonLid,
  searchReasonLid
} = require("../controllers/reason_lid.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createReasonLidValidationSchema,
  updateReasonLidValidationSchema,
} = require("../validation/reason_lidValidation");



/**
 * @swagger
 * tags:
 *   - name: Reason_lid
 *     description: Reason_lid uchun API endpointlar
 */

/**
 * @swagger
 * /reason_lid/addReason_lid:
 *   post:
 *    summary: Yangi Reason_lid qo'shish
 *    tags: [Reason_lid]
 *    description: Yangi Reason_lid yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              reason_lid:
 *                type: string
 *    responses:
 *      201:
 *        description: Reason_lid muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
reason_lid.post("/addReason_lid", validationSchema(createReasonLidValidationSchema), addReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lid:
 *   get:
 *     summary: Barcha reason_lid larni olish
 *     tags: [Reason_lid]
 *     description: Barcha reason_lid larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: reason_lid lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.get("/getReason_lid", getReason_lid);


/**
 * @swagger
 * /reason_lid/getReasonLidById/{id}:
 *   get:
 *     summary: Reason_lid larni ID bo'yicha olish
 *     tags: [Reason_lid]
 *     description: Reason_lid ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reason_lid ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reason_lid muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.get("/getReasonLidById/:id", getReasonLidById);

/**
 * @swagger
 * /reason_lid/updateReasonLid/{id}:
 *   put:
 *     summary: Reason_lid ni yangilash
 *     tags: [Reason_lid]
 *     description: Reason_lid ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reason_lid ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason_lid:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reason_lid muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.put("/updateReasonLid/:id", validationSchema(updateReasonLidValidationSchema), updateReasonLid);

/**
 * @swagger
 * /reason_lid/deleteReasonLid/{id}:
 *   delete:
 *     summary: Reason_lid ni ID orqali o'chirish
 *     tags: [Reason_lid]
 *     description: Berilgan ID orqali Reason_lid ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Reason_lid ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reason_lid muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.delete("/deleteReasonLid/:id", deleteReasonLid);

/**
 * @swagger
 * /reason_lid/searchReasonLid:
 *   get:
 *     summary: Reason_lid larni qidirish
 *     tags: [Reason_lid]
 *     description: Reason_lid larni qidirish
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
 *         description: Reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.get("/searchReasonLid", searchReasonLid);

module.exports = { reason_lid };
