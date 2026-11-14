const { Router } = require("express");
const lesson = Router();

const {
  addLesson,
  getLesson,
  getLessonById,
  updateLesson,
  deleteLesson
} = require("../controllers/lesson.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createLessonValidationSchema,
  updateLessonValidationSchema,
} = require("../validation/lessonValidation");



/**
 * @swagger
 * tags:
 *   - name: Lesson
 *     description: Lesson uchun API endpointlar
 */

/**
 * @swagger
 * /lesson/addLesson:
 *   post:
 *    summary: Yangi Lesson qo'shish
 *    tags: [Lesson]
 *    description: Yangi Lesson yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              lesson_theme:
 *                type: string
 *              lesson_nuber:
 *                type: string
 *              group_id:
 *                type: string
 *              lesson_date:
 *                type: string
 *    responses:
 *      201:
 *        description: Lesson muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
lesson.post("/addLesson", validationSchema(createLessonValidationSchema), addLesson);

/**
 * @swagger
 * /lesson/getLesson:
 *   get:
 *     summary: Barcha lesson larni olish
 *     tags: [Lesson]
 *     description: Barcha lesson larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: lesson lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.get("/getLesson", getLesson);


/**
 * @swagger
 * /lesson/getLessonById/{id}:
 *   get:
 *     summary: Lesson larni ID bo'yicha olish
 *     tags: [Lesson]
 *     description: Lesson ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lesson ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lesson muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Lesson topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.get("/getLessonById/:id", getLessonById);

/**
 * @swagger
 * /lesson/updateLesson/{id}:
 *   put:
 *     summary: Lesson ni yangilash
 *     tags: [Lesson]
 *     description: Lesson ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lesson ni ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_theme:
 *                 type: string
 *               lesson_nuber:
 *                 type: string
 *               group_id:
 *                 type: string
 *               lesson_date:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Lesson muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Lesson topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.put("/updateLesson/:id", validationSchema(updateLessonValidationSchema), updateLesson);

/**
 * @swagger
 * /lesson/deleteLesson/{id}:
 *   delete:
 *     summary: Lesson ni ID orqali o'chirish
 *     tags: [Lesson]
 *     description: Berilgan ID orqali Lesson ni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Lesson ni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lesson muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Lesson topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.delete("/deleteLesson/:id", deleteLesson);

module.exports = { lesson };
