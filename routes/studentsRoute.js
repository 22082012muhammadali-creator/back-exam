const { Router } = require("express");
const students = Router();

const {
  addStudents,
  getStudents,
  getStudentsById,
  updateStudents,
  deleteStudents,
  searchStudents
} = require("../controllers/students.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createStudentsValidationSchema,
  updateStudentsValidationSchema,
} = require("../validation/studentsValidation");



/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Students uchun API endpointlar
 */

/**
 * @swagger
 * /students/addStudents:
 *   post:
 *    summary: Yangi Students qo'shish
 *    tags: [Students]
 *    description: Yangi Students yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              lid_id:
 *                type: string
 *              first_name:
 *                type: string
 *              last_name:
 *                type: string
 *              phone_number:
 *                type: string
 *              bithday:
 *                type: string
 *              gender:
 *                type: string
 *    responses:
 *      201:
 *        description: Students muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
students.post("/addStudents", validationSchema(createStudentsValidationSchema), addStudents);

/**
 * @swagger
 * /students/getStudents:
 *   get:
 *     summary: Barcha students larni olish
 *     tags: [Students]
 *     description: Barcha students larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: students lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
students.get("/getStudents", getStudents);


/**
 * @swagger
 * /students/getStudentsById/{id}:
 *   get:
 *     summary: Students larni ID bo'yicha olish
 *     tags: [Students]
 *     description: Students ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Students ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Students muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Students topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
students.get("/getStudentsById/:id", getStudentsById);

/**
 * @swagger
 * /students/updateStudents/{id}:
 *   put:
 *     summary: Students ni yangilash
 *     tags: [Students]
 *     description: Students ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Students ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lid_id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               bithday:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Students muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Students topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
students.put("/updateStudents/:id", validationSchema(updateStudentsValidationSchema), updateStudents);

/**
 * @swagger
 * /students/deleteStudents/{id}:
 *   delete:
 *     summary: Students ni ID orqali o'chirish
 *     tags: [Students]
 *     description: Berilgan ID orqali Students ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Students ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Students muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Students topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
students.delete("/deleteStudents/:id", deleteStudents);

/**
 * @swagger
 * /students/searchStudents:
 *   get:
 *     summary: Students larni qidirish
 *     tags: [Students]
 *     description: Students larni first_name, last_name, phone_number bo'yicha qidirish
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
 *         description: Students topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
students.get("/searchStudents", searchStudents);

module.exports = { students };
