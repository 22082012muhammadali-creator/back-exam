const { Stage } = require("../model/stageSchema");

// -------------add Stage------------
const addStage = async (req, res) => {
  try {
    const { name } = req.body;

    const newStage = new Stage({
      name
    });

    await newStage.save();
    res.status(201).json({ success: true, message: "Stage successfully added", data: newStage });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Stage" });
  }
};

// -------------------Get Stage---------------
const getStage = async (req, res) => {
  try {
    const stages = await Stage.find();
    if (!stages || stages.length === 0) {
      return res.status(404).json({ success: false, message: "Stage not found" });
    }
    res.status(200).json({ success: true, message: "All stages fetched", data: stages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching stage" });
  }
};

// ----------------get Stage by ID -----------------------
const getStageById = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await Stage.findById(id);
    if (!stage) {
      return res.status(404).json({ success: false, message: "Stage not found" });
    }
    res.status(200).json({ success: true, message: "Stage fetched", data: stage });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching stage" });
  }
};

// --------------update Stage---------------
const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedStage = await Stage.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedStage) {
      return res.status(404).json({ success: false, message: "Stage not found" });
    }

    res.status(200).json({ success: true, message: "Stage updated successfully", data: updatedStage });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Stage" });
  }
};


// ------------delete Stage----------------
const deleteStage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStage = await Stage.findByIdAndDelete(id);

    if (!deletedStage) {
      return res.status(404).json({ success: false, message: "Stage not found" });
    }

    res.status(200).json({ success: true, message: "Stage deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchStage = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Stage.find({
      $or: [
        { name: { $regex: query, $options: "i" } }
      ]
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Stage not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching stage:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch stage" });
  }
};

module.exports = {
  addStage,
  getStage,
  getStageById,
  updateStage,
  deleteStage,
  searchStage
};