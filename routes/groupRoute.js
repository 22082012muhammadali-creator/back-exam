const { Router } = require("express");
const group = Router();

const {
  addGroup,
  getGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  searchGroup
} = require("../controllers/group.controller");


const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  createGroupValidationSchema,
  updateGroupValidationSchema,
} = require("../validation/groupValidation");



/**
 * @swagger
 * tags:
 *   - name: Group
 *     description: Group uchun API endpointlar
 */

/**
 * @swagger
 * /group/addGroup:
 *   post:
 *    summary: Yangi Group qo'shish
 *    tags: [Group]
 *    description: Yangi Group yaratildi.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              group_name:
 *                type: string
 *              lesson_start_time:
 *                type: string
 *              lesson_continuous:
 *                type: string
 *              lesson_week_day: 
 *                type: string
 *              group_stage_idint: 
 *                type: string
 *              room_number:
 *                type: string
 *              room_floor:
 *                type: number
 *              branch_id: 
 *                type: string
 *              lessons_quant:
 *                type: string
 *              is_active: 
 *                type: boolean
 *    responses:
 *      201:
 *        description: Group muvaffaqiyatli qo'shldi.
 *      400:
 *        description: Noto'g'ri ma'lumot yuborlgan.
 *      500:
 *        description: Ichki server xatosi.
 */
group.post("/addGroup", validationSchema(createGroupValidationSchema), addGroup);

/**
 * @swagger
 * /group/getGroup:
 *   get:
 *     summary: Barcha grouplarni olish
 *     tags: [Group]
 *     description: Barcha grouplarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: grouplar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
group.get("/getGroup", getGroup);


/**
 * @swagger
 * /group/getGroupById/{id}:
 *   get:
 *     summary: Grouplarni ID bo'yicha olish
 *     tags: [Group]
 *     description: Groupni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Group ID si
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group.get("/getGroupById/:id", getGroupById);

/**
 * @swagger
 * /group/updateGroup/{id}:
 *   put:
 *     summary: Groupni yangilash
 *     tags: [Group]
 *     description: Group ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Groupni  ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *               lesson_start_time:
 *                 type: string
 *               lesson_continuous:
 *                 type: string
 *               lesson_week_day: 
 *                 type: string
 *               group_stage_idint: 
 *                 type: string
 *               room_number:
 *                 type: string
 *               room_floor:
 *                 type: number
 *               branch_id:
 *                 type: string
 *               lessons_quant: 
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Group muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group.put("/updateGroup/:id", validationSchema(updateGroupValidationSchema), updateGroup);

/**
 * @swagger
 * /group/deleteGroup/{id}:
 *   delete:
 *     summary: Group ID orqali o'chirish
 *     tags: [Group]
 *     description: Berilgan ID orqali Groupni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Groupni ID raqami
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group.delete("/deleteGroup/:id", deleteGroup);

/**
 * @swagger
 * /group/searchGroup:
 *   get:
 *     summary: Group larni qidirish
 *     tags: [Group]
 *     description: Group larni group_name, room_number bo'yicha qidirish
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
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group.get("/searchGroup", searchGroup);

module.exports = { group };
