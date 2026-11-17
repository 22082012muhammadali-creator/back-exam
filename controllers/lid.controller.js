const { Lid } = require("../model/lidSchema");

// -------------add Lid------------
const addLid = async (req, res) => {
  try {
    const { firstname, lastname, phone_number, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reson_id } = req.body;

    const newLid = new Lid({
      firstname,
      lastname,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reson_id
    });

    await newLid.save();
    res.status(201).json({ success: true, message: "Lid successfully added", data: newLid });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Lid" });
  }
};

// -------------------Get Lid---------------
const getLid = async (req, res) => {
  try {
    const lids = await Lid.find().populate("lid_stage_id trial_lesson_group_id lid_status_id cancel_reson_id");
    if (!lids || lids.length === 0) {
      return res.status(404).json({ success: false, message: "Lid not found" });
    }
    res.status(200).json({ success: true, message: "All lids fetched", data: lids });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching lid" });
  }
};

// ----------------get Lid by ID -----------------------
const getLidById = async (req, res) => {
  try {
    const { id } = req.params;

    const lid = await Lid.findById(id).populate("lid_stage_id trial_lesson_group_id lid_status_id cancel_reson_id");
    if (!lid) {
      return res.status(404).json({ success: false, message: "Lid not found" });
    }
    res.status(200).json({ success: true, message: "Lid fetched", data: lid });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching lid" });
  };
};

// --------------update Lid---------------
const updateLid = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, phone_number, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reson_id } = req.body;

    const updatedLid = await Lid.findByIdAndUpdate(
      id,
      { firstname, lastname, phone_number, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reson_id },
      { new: true }
    ).populate("lid_stage_id trial_lesson_group_id lid_status_id cancel_reson_id");

    if (!updatedLid) {
      return res.status(404).json({ success: false, message: "Lid not found" });
    }

    res.status(200).json({ success: true, message: "Lid updated successfully", data: updatedLid });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Lid" });
  }
};


// ------------delete Lid----------------
const deleteLid = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLid = await Lid.findByIdAndDelete(id);

    if (!deletedLid) {
      return res.status(404).json({ success: false, message: "Lid not found" });
    }

    res.status(200).json({ success: true, message: "Lid deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchLid = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Lid.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } }
      ]
    }).populate("lid_stage_id trial_lesson_group_id lid_status_id cancel_reson_id");

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Lid not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching lid:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch lid" });
  }
};

module.exports = {
  addLid,
  getLid,
  getLidById,
  updateLid,
  deleteLid,
  searchLid
};
