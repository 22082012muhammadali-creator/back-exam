const { Student_Group } = require("../model/student_groupSchema");

// -------------add Student_Group------------
const addStudent_group = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;

    const newStudent_group = new Student_Group({
      student_id,
      group_id
    });

    await newStudent_group.save();
    res.status(201).json({ success: true, message: "Student_Group successfully added", data: newStudent_group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Student_Group" });
  }
};

// -------------------Get Student_Group---------------
const getStudent_group = async (req, res) => {
  try {
    const student_groups = await Student_Group.find().populate("student_id group_id");
    if (!student_groups || student_groups.length === 0) {
      return res.status(404).json({ success: false, message: "Student_Group not found" });
    }
    res.status(200).json({ success: true, message: "All student_groups fetched", data: student_groups });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching student_group" });
  }
};

// ----------------get Student_Group by ID -----------------------
const getStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const student_group = await Student_Group.findById(id).populate("student_id group_id");
    if (!student_group) {
      return res.status(404).json({ success: false, message: "Student_Group not found" });
    }
    res.status(200).json({ success: true, message: "Student_Group fetched", data: student_group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching student_group" });
  };
};

// --------------update Student_Group---------------
const updateStudentGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, group_id } = req.body;

    const updatedStudentGroup = await Student_Group.findByIdAndUpdate(
      id,
      { student_id, group_id },
      { new: true }
    ).populate("student_id group_id");

    if (!updatedStudentGroup) {
      return res.status(404).json({ success: false, message: "Student_Group not found" });
    }

    res.status(200).json({ success: true, message: "Student_Group updated successfully", data: updatedStudentGroup });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Student_Group" });
  }
};


// ------------delete Student_Group----------------
const deleteStudentGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudentGroup = await Student_Group.findByIdAndDelete(id);

    if (!deletedStudentGroup) {
      return res.status(404).json({ success: false, message: "Student_Group not found" });
    }

    res.status(200).json({ success: true, message: "Student_Group deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addStudent_group,
  getStudent_group,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup
};
