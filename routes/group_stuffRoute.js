const { Router } = require("express");
const group_stuff = Router();

const {
  addGroup_stuff,
  getGroup_stuff,
  getGroupStuffById,
  updateGroupStuff,
  deleteGroupStuff
} = require("../controllers/group_stuff.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createGroupStuffValidationSchema,
  updateGroupStuffValidationSchema,
} = require("../validation/group_stuffValidation");



/**
 * @swagger
 * tags:
 *   - name: Group_stuff
 *     description: Group_stuff uchun API endpointlar
 */

/**
 * @swagger
 * /group_stuff/addGroup_stuff:
 *   post:
 *    summary: Yangi Group_stuff qo'shish
 *    tags: [Group_stuff]
 *    description: Yangi Group_stuff yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              group_id:
 *                type: string
 *              stuff_id:
 *                type: string
 *    responses:
 *      201:
 *        description: Group_stuff muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
group_stuff.post("/addGroup_stuff", validationSchema(createGroupStuffValidationSchema), addGroup_stuff);

/**
 * @swagger
 * /group_stuff/getGroup_stuff:
 *   get:
 *     summary: Barcha group_stuff larni olish
 *     tags: [Group_stuff]
 *     description: Barcha group_stuff larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: group_stuff lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.get("/getGroup_stuff", getGroup_stuff);


/**
 * @swagger
 * /group_stuff/getGroupStuffById/{id}:
 *   get:
 *     summary: Group_stuff larni ID bo'yicha olish
 *     tags: [Group_stuff]
 *     description: Group_stuff ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Group_stuff ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group_stuff muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Group_stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.get("/getGroupStuffById/:id", getGroupStuffById);

/**
 * @swagger
 * /group_stuff/updateGroupStuff/{id}:
 *   put:
 *     summary: Group_stuff ni yangilash
 *     tags: [Group_stuff]
 *     description: Group_stuff ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Group_stuff ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *               stuff_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Group_stuff muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Group_stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.put("/updateGroupStuff/:id", validationSchema(updateGroupStuffValidationSchema), updateGroupStuff);

/**
 * @swagger
 * /group_stuff/deleteGroupStuff/{id}:
 *   delete:
 *     summary: Group_stuff ni ID orqali o'chirish
 *     tags: [Group_stuff]
 *     description: Berilgan ID orqali Group_stuff ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Group_stuff ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group_stuff muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Group_stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.delete("/deleteGroupStuff/:id", deleteGroupStuff);

module.exports = { group_stuff };
