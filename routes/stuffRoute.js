const { Router } = require("express");
const stuff = Router();

const {
  addStuff,
  getStuff,
  getStuffById,
  updateStuff,
  deleteStuff
} = require("../controllers/stuff.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createStuffValidationSchema,
  updateStuffValidationSchema,
} = require("../validation/stuffValidation");



/**
 * @swagger
 * tags:
 *   - name: Stuff
 *     description: Stuff uchun API endpointlar
 */

/**
 * @swagger
 * /stuff/addStuff:
 *   post:
 *    summary: Yangi Stuff qo'shish
 *    tags: [Stuff]
 *    description: Yangi Stuff yaratildi.
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
 *              login: 
 *                type: string
 *              parol: 
 *                type: string
 *              is_active:
 *                type: string
 *    responses:
 *      201:
 *        description: Stuff muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
stuff.post("/addStuff", validationSchema(createStuffValidationSchema), addStuff);

/**
 * @swagger
 * /stuff/getStuff:
 *   get:
 *     summary: Barcha stufflarni olish
 *     tags: [Stuff]
 *     description: Barcha stufflarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: stufflar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff.get("/getStuff", getStuff);


/**
 * @swagger
 * /stuff/getStuffById/{id}:
 *   get:
 *     summary: Stufflarni ID bo'yicha olish
 *     tags: [Stuff]
 *     description: Stuffni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stuff ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff.get("/getStuffById/:id", getStuffById);

/**
 * @swagger
 * /stuff/updateStuff/{id}:
 *   put:
 *     summary: Stuffni yangilash
 *     tags: [Stuff]
 *     description: Stuff ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stuffni  ID raqami
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
 *               login: 
 *                 type: string
 *               parol: 
 *                 type: string
 *               is_active:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Stuff muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff.put("/updateStuff/:id", validationSchema(updateStuffValidationSchema), updateStuff);

/**
 * @swagger
 * /stuff/deleteStuff/{id}:
 *   delete:
 *     summary: Stuff ID orqali o'chirish
 *     tags: [Stuff]
 *     description: Berilgan ID orqali Stuffni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Stuffni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff.delete("/deleteStuff/:id", deleteStuff);

module.exports = { stuff };
