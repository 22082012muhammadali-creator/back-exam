const { Router } = require("express");
const lid_status = Router();

const {
  addLid_status,
  getLid_status,
  getLidStatusById,
  updateLidStatus,
  deleteLidStatus,
  searchLidStatus
} = require("../controllers/lid_status.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createLidStatusValidationSchema,
  updateLidStatusValidationSchema,
} = require("../validation/lid_statusValidation");



/**
 * @swagger
 * tags:
 *   - name: Lid_status
 *     description: Lid_status uchun API endpointlar
 */

/**
 * @swagger
 * /lid_status/addLid_status:
 *   post:
 *    summary: Yangi Lid_status qo'shish
 *    tags: [Lid_status]
 *    description: Yangi Lid_status yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *    responses:
 *      201:
 *        description: Lid_status muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
lid_status.post("/addLid_status", validationSchema(createLidStatusValidationSchema), addLid_status);

/**
 * @swagger
 * /lid_status/getLid_status:
 *   get:
 *     summary: Barcha lid_status larni olish
 *     tags: [Lid_status]
 *     description: Barcha lid_status larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: lid_status lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.get("/getLid_status", getLid_status);


/**
 * @swagger
 * /lid_status/getLidStatusById/{id}:
 *   get:
 *     summary: Lid_status larni ID bo'yicha olish
 *     tags: [Lid_status]
 *     description: Lid_status ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lid_status ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid_status muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Lid_status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.get("/getLidStatusById/:id", getLidStatusById);

/**
 * @swagger
 * /lid_status/updateLidStatus/{id}:
 *   put:
 *     summary: Lid_status ni yangilash
 *     tags: [Lid_status]
 *     description: Lid_status ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lid_status ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Lid_status muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Lid_status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.put("/updateLidStatus/:id", validationSchema(updateLidStatusValidationSchema), updateLidStatus);

/**
 * @swagger
 * /lid_status/deleteLidStatus/{id}:
 *   delete:
 *     summary: Lid_status ni ID orqali o'chirish
 *     tags: [Lid_status]
 *     description: Berilgan ID orqali Lid_status ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Lid_status ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid_status muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Lid_status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.delete("/deleteLidStatus/:id", deleteLidStatus);

/**
 * @swagger
 * /lid_status/searchLidStatus:
 *   get:
 *     summary: Lid_status larni qidirish
 *     tags: [Lid_status]
 *     description: Lid_status larni status bo'yicha qidirish
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
 *         description: Lid_status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.get("/searchLidStatus", searchLidStatus);

module.exports = { lid_status };
