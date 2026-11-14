const { Router } = require("express");
const student_group = Router();

const {
  addStudent_group,
  getStudent_group,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup
} = require("../controllers/student_group.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createStudentGroupValidationSchema,
  updateStudentGroupValidationSchema,
} = require("../validation/student_groupValidation");



/**
 * @swagger
 * tags:
 *   - name: Student_Group
 *     description: Student_Group uchun API endpointlar
 */

/**
 * @swagger
 * /student_group/addStudent_group:
 *   post:
 *    summary: Yangi Student_Group qo'shish
 *    tags: [Student_Group]
 *    description: Yangi Student_Group yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              student_id:
 *                type: string
 *              group_id:
 *                type: string
 *    responses:
 *      201:
 *        description: Student_Group muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
student_group.post("/addStudent_group", validationSchema(createStudentGroupValidationSchema), addStudent_group);

/**
 * @swagger
 * /student_group/getStudent_group:
 *   get:
 *     summary: Barcha student_group larni olish
 *     tags: [Student_Group]
 *     description: Barcha student_group larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: student_group lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.get("/getStudent_group", getStudent_group);


/**
 * @swagger
 * /student_group/getStudentGroupById/{id}:
 *   get:
 *     summary: Student_Group larni ID bo'yicha olish
 *     tags: [Student_Group]
 *     description: Student_Group ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student_Group ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student_Group muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Student_Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.get("/getStudentGroupById/:id", getStudentGroupById);

/**
 * @swagger
 * /student_group/updateStudentGroup/{id}:
 *   put:
 *     summary: Student_Group ni yangilash
 *     tags: [Student_Group]
 *     description: Student_Group ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student_Group ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               group_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Student_Group muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Student_Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.put("/updateStudentGroup/:id", validationSchema(updateStudentGroupValidationSchema), updateStudentGroup);

/**
 * @swagger
 * /student_group/deleteStudentGroup/{id}:
 *   delete:
 *     summary: Student_Group ni ID orqali o'chirish
 *     tags: [Student_Group]
 *     description: Berilgan ID orqali Student_Group ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Student_Group ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student_Group muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Student_Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.delete("/deleteStudentGroup/:id", deleteStudentGroup);

module.exports = { student_group };
