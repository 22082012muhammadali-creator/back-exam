const { Router } = require("express");
const lid = Router();

const {
  addLid,
  getLid,
  getLidById,
  updateLid,
  deleteLid,
  searchLid
} = require("../controllers/lid.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createLidValidationSchema,
  updateLidValidationSchema,
} = require("../validation/lidValidation");



/**
 * @swagger
 * tags:
 *   - name: Lid
 *     description: Lid uchun API endpointlar
 */

/**
 * @swagger
 * /lid/addLid:
 *   post:
 *    summary: Yangi Lid qo'shish
 *    tags: [Lid]
 *    description: Yangi Lid yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              phone_number:
 *                type: string
 *              lid_stage_id:
 *                type: string
 *              test_date:
 *                type: string
 *              trial_lesson_date:
 *                type: string
 *              trial_lesson_time:
 *                type: string
 *              trial_lesson_group_id:
 *                type: string
 *              lid_status_id:
 *                type: string
 *              cancel_reson_id:
 *                type: string
 *    responses:
 *      201:
 *        description: Lid muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
lid.post("/addLid", validationSchema(createLidValidationSchema), addLid);

/**
 * @swagger
 * /lid/getLid:
 *   get:
 *     summary: Barcha lid larni olish
 *     tags: [Lid]
 *     description: Barcha lid larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: lid lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.get("/getLid", getLid);


/**
 * @swagger
 * /lid/getLidById/{id}:
 *   get:
 *     summary: Lid larni ID bo'yicha olish
 *     tags: [Lid]
 *     description: Lid ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lid ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.get("/getLidById/:id", getLidById);

/**
 * @swagger
 * /lid/updateLid/{id}:
 *   put:
 *     summary: Lid ni yangilash
 *     tags: [Lid]
 *     description: Lid ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lid ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *               trial_lesson_date:
 *                 type: string
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: string
 *               lid_status_id:
 *                 type: string
 *               cancel_reson_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Lid muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.put("/updateLid/:id", validationSchema(updateLidValidationSchema), updateLid);

/**
 * @swagger
 * /lid/deleteLid/{id}:
 *   delete:
 *     summary: Lid ni ID orqali o'chirish
 *     tags: [Lid]
 *     description: Berilgan ID orqali Lid ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Lid ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.delete("/deleteLid/:id", deleteLid);

/**
 * @swagger
 * /lid/searchLid:
 *   get:
 *     summary: Lid larni qidirish
 *     tags: [Lid]
 *     description: Lid larni firstname, lastname, phone_number bo'yicha qidirish
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
 *         description: Lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.get("/searchLid", searchLid);

module.exports = { lid };
