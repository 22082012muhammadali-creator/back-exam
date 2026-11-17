const { Students } = require("../model/studentsSchema");

// -------------add Students------------
const addStudents = async (req, res) => {
  try {
    const { lid_id, first_name, last_name, phone_number, bithday, gender } = req.body;

    const newStudents = new Students({
      lid_id,
      first_name,
      last_name,
      phone_number,
      bithday,
      gender
    });

    await newStudents.save();
    res.status(201).json({ success: true, message: "Students successfully added", data: newStudents });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Students" });
  }
};

// -------------------Get Students---------------
const getStudents = async (req, res) => {
  try {
    const students = await Students.find().populate("lid_id");
    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, message: "Students not found" });
    }
    res.status(200).json({ success: true, message: "All students fetched", data: students });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching students" });
  }
};

// ----------------get Students by ID -----------------------
const getStudentsById = async (req, res) => {
  try {
    const { id } = req.params;

    const students = await Students.findById(id).populate("lid_id");
    if (!students) {
      return res.status(404).json({ success: false, message: "Students not found" });
    }
    res.status(200).json({ success: true, message: "Students fetched", data: students });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching students" });
  };
};

// --------------update Students---------------
const updateStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const { lid_id, first_name, last_name, phone_number, bithday, gender } = req.body;

    const updatedStudents = await Students.findByIdAndUpdate(
      id,
      { lid_id, first_name, last_name, phone_number, bithday, gender },
      { new: true }
    ).populate("lid_id");

    if (!updatedStudents) {
      return res.status(404).json({ success: false, message: "Students not found" });
    }

    res.status(200).json({ success: true, message: "Students updated successfully", data: updatedStudents });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Students" });
  }
};


// ------------delete Students----------------
const deleteStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudents = await Students.findByIdAndDelete(id);

    if (!deletedStudents) {
      return res.status(404).json({ success: false, message: "Students not found" });
    }

    res.status(200).json({ success: true, message: "Students deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchStudents = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Students.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } }
      ]
    }).populate("lid_id");

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Students not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch students" });
  }
};

module.exports = {
  addStudents,
  getStudents,
  getStudentsById,
  updateStudents,
  deleteStudents,
  searchStudents
};
