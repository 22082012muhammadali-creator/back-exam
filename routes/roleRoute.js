const { Router } = require("express");
const role = Router();

const { addRole, getRoles, getRoleById, deleteRole, updateRole, searchRole } = require("../controllers/role.controller");



const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createRoleValidationSchema,
  updateRoleValidationSchema,
} = require("../validation/roleValidation");




/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Role larni boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /role/addRole:
 *   post:
 *     summary: Yangi Roleni ro'yxatdan o'tkazish
 *     tags: [Roles]
 *     description: Yangi Role yaratildi.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role muvaffaqiyatli qo'shildi.
 *       400:
 *         description: Noto'g'ri malumot yuborilgan.
 *       500:
 *         description: Ichki server xatosi.
 */
role.post("/addRole", validationSchema(createRoleValidationSchema), addRole);

/**
 * @swagger
 * /role/getRoles:
 *   get:
 *     summary: Barcha Role larni olish
 *     tags: [Roles]
 *     description: Barcha role lar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Role lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
role.get("/getRoles", getRoles);

/**
 * @swagger
 * /role/getRoleById/{id}:
 *   get:
 *     summary: Roleni ID bo'yicha olish
 *     tags: [Roles]
 *     description: Roleni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
role.get("/getRoleByID/:id", getRoleById);

/**
 * @swagger
 * /role/deleteRole/{id}:
 *   delete:
 *     summary: Roleni ID orqali o'chirish
 *     tags: [Roles]
 *     description: Berilgan ID orqali roleni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan role ning ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
role.delete("/deleteRole/:id", deleteRole);

/**
 * @swagger
 * /role/updateRole/{id}:
 *   put:
 *     summary: Roleni yangilash
 *     tags: [Roles]
 *     description: Role ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ning ID raqami
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
 *                 description: Yangi name
 *     responses:
 *       '200':
 *         description: Role muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
role.put("/updateRole/:id", validationSchema(updateRoleValidationSchema), updateRole);

/**
 * @swagger
 * /role/searchRole:
 *   get:
 *     summary: Role larni qidirish
 *     tags: [Roles]
 *     description: Role larni name bo'yicha qidirish
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
 *         description: Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
role.get("/searchRole", searchRole);

module.exports = { role };