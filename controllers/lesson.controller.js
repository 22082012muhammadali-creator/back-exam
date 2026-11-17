const { Lesson } = require("../model/lessonSchema");

// -------------add Lesson------------
const addLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_nuber, group_id, lesson_date } = req.body;

    const newLesson = new Lesson({
      lesson_theme,
      lesson_nuber,
      group_id,
      lesson_date
    });

    await newLesson.save();
    res.status(201).json({ success: true, message: "Lesson successfully added", data: newLesson });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Lesson" });
  }
};

// -------------------Get Lesson---------------
const getLesson = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("group_id");
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }
    res.status(200).json({ success: true, message: "All lessons fetched", data: lessons });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching lesson" });
  }
};

// ----------------get Lesson by ID -----------------------
const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findById(id).populate("group_id");
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }
    res.status(200).json({ success: true, message: "Lesson fetched", data: lesson });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching lesson" });
  };
};

// --------------update Lesson---------------
const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_nuber, group_id, lesson_date } = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { lesson_theme, lesson_nuber, group_id, lesson_date },
      { new: true }
    ).populate("group_id");

    if (!updatedLesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    res.status(200).json({ success: true, message: "Lesson updated successfully", data: updatedLesson });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Lesson" });
  }
};


// ------------delete Lesson----------------
const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLesson = await Lesson.findByIdAndDelete(id);

    if (!deletedLesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    res.status(200).json({ success: true, message: "Lesson deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchLesson = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Lesson.find({
      $or: [
        { lesson_theme: { $regex: query, $options: "i" } },
        { lesson_nuber: { $regex: query, $options: "i" } },
        { lesson_date: { $regex: query, $options: "i" } }
      ]
    }).populate("group_id");

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching lesson:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch lesson" });
  }
};

module.exports = {
  addLesson,
  getLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
  searchLesson
};
