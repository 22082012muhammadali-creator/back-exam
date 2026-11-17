const { Router } = require("express");
const stage = Router();

const {
  addStage,
  getStage,
  getStageById,
  updateStage,
  deleteStage,
  searchStage
} = require("../controllers/stage.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createStageValidationSchema,
  updateStageValidationSchema,
} = require("../validation/stageValidation");



/**
 * @swagger
 * tags:
 *   - name: Stage
 *     description: Stage uchun API endpointlar
 */

/**
 * @swagger
 * /stage/addStage:
 *   post:
 *    summary: Yangi Stage qo'shish
 *    tags: [Stage]
 *    description: Yangi Stage yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      201:
 *        description: Stage muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
stage.post("/addStage", validationSchema(createStageValidationSchema), addStage);

/**
 * @swagger
 * /stage/getStage:
 *   get:
 *     summary: Barcha Stagelarni olish
 *     tags: [Stage]
 *     description: Barcha stagelarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: stagelar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
stage.get("/getStage", getStage);


/**
 * @swagger
 * /stage/getStageById/{id}:
 *   get:
 *     summary: Stagelarni ID bo'yicha olish
 *     tags: [Stage]
 *     description: Stageni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stage ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stage.get("/getStageById/:id", getStageById);

/**
 * @swagger
 * /stage/updateStage/{id}:
 *   put:
 *     summary: Stageni yangilash
 *     tags: [Stage]
 *     description: Stage ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stageni  ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Stage muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stage.put("/updateStage/:id", validationSchema(updateStageValidationSchema), updateStage);

/**
 * @swagger
 * /stage/deleteStage/{id}:
 *   delete:
 *     summary: Stage ID orqali o'chirish
 *     tags: [Stage]
 *     description: Berilgan ID orqali Stageni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Stageni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stage.delete("/deleteStage/:id", deleteStage);

/**
 * @swagger
 * /stage/searchStage:
 *   get:
 *     summary: Stage larni qidirish
 *     tags: [Stage]
 *     description: Stage larni name bo'yicha qidirish
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
 *         description: Stage topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stage.get("/searchStage", searchStage);

module.exports = { stage };
