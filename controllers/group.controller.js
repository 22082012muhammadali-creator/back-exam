const { Group } = require("../model/groupSchema");

// -------------add Group------------
const addGroup = async (req, res) => {
  try {
    const { group_name, lesson_start_time, lesson_continuous, lesson_week_day, group_stage_idint, room_number, room_floor, branch_id, lessons_quant, is_active } = req.body;

    const newGroup = new Group({
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_idint,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active
    });

    await newGroup.save();
    res.status(201).json({ success: true, message: "Group successfully added", data: newGroup });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Group" });
  }
};

// -------------------Get Group---------------
const getGroup = async (req, res) => {
  try {
    const groups = await Group.find().populate("branch_id");
    res.status(200).json({ success: true, message: "All groups fetched", data: groups });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching groups" });
  }
};

// ----------------get Group by ID -----------------------
const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id).populate("branch_id");
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }
    res.status(200).json({ success: true, message: "Group fetched", data: group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching group" });
  };
};

// --------------update Group---------------
const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_name, lesson_start_time, lesson_continuous, lesson_week_day, group_stage_idint, room_number, room_floor, branch_id, lessons_quant, is_active } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { group_name, lesson_start_time, lesson_continuous, lesson_week_day, group_stage_idint, room_number, room_floor, branch_id, lessons_quant, is_active },
      { new: true }
    ).populate("branch_id");

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, message: "Group updated successfully", data: updatedGroup });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Group" });
  }
};


// ------------delete Group----------------
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, message: "Group deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchGroup = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Group.find({
      $or: [
        { group_name: { $regex: query, $options: "i" } },
        { room_number: { $regex: query, $options: "i" } },
        { lesson_week_day: { $regex: query, $options: "i" } }
      ]
    }).populate("branch_id");

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching group:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch group" });
  }
};

module.exports = {
  addGroup,
  getGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  searchGroup
};