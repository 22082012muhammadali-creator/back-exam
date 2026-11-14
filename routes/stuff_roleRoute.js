const { Router } = require("express");
const stuff_role = Router();

const {
  addStuff_role,
  getStuff_role,
  getStuffRoleById,
  updateStuffRole,
  deleteStuffRole
} = require("../controllers/stuff_role.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createStuffRoleValidationSchema,
  updateStuffRoleValidationSchema,
} = require("../validation/stuff_roleValidation");



/**
 * @swagger
 * tags:
 *   - name: Stuff_Role
 *     description: Stuff_role uchun API endpointlar
 */

/**
 * @swagger
 * /stuff_role/addStuff_role:
 *   post:
 *    summary: Yangi Stuff_role qo'shish
 *    tags: [Stuff_Role]
 *    description: Yangi Stuff_Role yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              stuff_id:
 *                type: string
 *              role_id:
 *                type: string
 *    responses:
 *      201:
 *        description: Stuff_Role muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
stuff_role.post("/addStuff_role", validationSchema(createStuffRoleValidationSchema), addStuff_role);

/**
 * @swagger
 * /stuff_role/getStuff_role:
 *   get:
 *     summary: Barcha stuff_role larni olish
 *     tags: [Stuff_Role]
 *     description: Barcha stuff-role larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: stuff_role lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.get("/getStuff_role", getStuff_role);


/**
 * @swagger
 * /stuff_role/getStuffRoleById/{id}:
 *   get:
 *     summary: Stufflarni ID bo'yicha olish
 *     tags: [Stuff_Role]
 *     description: Stuff_Roleni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stuff_Role ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff_Role muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Stuff_Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.get("/getStuffRoleById/:id", getStuffRoleById);

/**
 * @swagger
 * /stuff_role/updateStuffRole/{id}:
 *   put:
 *     summary: Stuff_Roleni yangilash
 *     tags: [Stuff_Role]
 *     description: Stuff_role ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stuff_Roleni  ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *               role_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Stuff_Role muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Stuff_Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.put("/updateStuffRole/:id", validationSchema(updateStuffRoleValidationSchema), updateStuffRole);

/**
 * @swagger
 * /stuff_role/deleteStuffRole/{id}:
 *   delete:
 *     summary: Stuff_Role ID orqali o'chirish
 *     tags: [Stuff_Role]
 *     description: Berilgan ID orqali Stuff_Roleni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Stuff_Roleni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff_Role muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Stuff_Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.delete("/deleteStuffRole/:id", deleteStuffRole);

module.exports = { stuff_role };
