const { Router } = require("express");
const branch = Router();

const {
  addBranch,
  getBranch,
  getBranchById,
  updateBranch,
  deleteBranch
} = require("../controllers/branch.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createBranchValidationSchema,
  updateBranchValidationSchema,
} = require("../validation/branchValidation");



/**
 * @swagger
 * tags:
 *   - name: Branch
 *     description: Branch uchun API endpointlar
 */

/**
 * @swagger
 * /branch/addBranch:
 *   post:
 *    summary: Yangi Branch qo'shish
 *    tags: [Branch]
 *    description: Yangi Branch yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              address:
 *                type: string
 *              call_number:
 *                type: string
 *    responses:
 *      201:
 *        description: Branch muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
branch.post("/addBranch", validationSchema(createBranchValidationSchema), addBranch);

/**
 * @swagger
 * /branch/getBranch:
 *   get:
 *     summary: Barcha branchlarni olish
 *     tags: [Branch]
 *     description: Barcha branchlarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: branchlar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.get("/getBranch", getBranch);


/**
 * @swagger
 * /branch/getBranchById/{id}:
 *   get:
 *     summary: Branchlarni ID bo'yicha olish
 *     tags: [Branch]
 *     description: Branchni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Branch ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.get("/getBranchById/:id", getBranchById);

/**
 * @swagger
 * /branch/updateBranch/{id}:
 *   put:
 *     summary: Branchni yangilash
 *     tags: [Branch]
 *     description: Branch ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Branchni  ID raqami
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
 *               address:
 *                 type: string
 *               call_number:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Branch muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.put("/updateBranch/:id", validationSchema(updateBranchValidationSchema), updateBranch);

/**
 * @swagger
 * /branch/deleteBranch/{id}:
 *   delete:
 *     summary: Branch ID orqali o'chirish
 *     tags: [Branch]
 *     description: Berilgan ID orqali Branchni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Branchni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.delete("/deleteBranch/:id", deleteBranch);

module.exports = { branch };
