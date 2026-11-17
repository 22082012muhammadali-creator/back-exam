const { Lid_status } = require("../model/lid_statusSchema");

// -------------add Lid_status------------
const addLid_status = async (req, res) => {
  try {
    const { status } = req.body;

    const newLid_status = new Lid_status({
      status
    });

    await newLid_status.save();
    res.status(201).json({ success: true, message: "Lid_status successfully added", data: newLid_status });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Lid_status" });
  }
};

// -------------------Get Lid_status---------------
const getLid_status = async (req, res) => {
  try {
    const lid_statuses = await Lid_status.find();
    if (!lid_statuses || lid_statuses.length === 0) {
      return res.status(404).json({ success: false, message: "Lid_status not found" });
    }
    res.status(200).json({ success: true, message: "All lid_statuses fetched", data: lid_statuses });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching lid_status" });
  }
};

// ----------------get Lid_status by ID -----------------------
const getLidStatusById = async (req, res) => {
  try {
    const { id } = req.params;

    const lid_status = await Lid_status.findById(id);
    if (!lid_status) {
      return res.status(404).json({ success: false, message: "Lid_status not found" });
    }
    res.status(200).json({ success: true, message: "Lid_status fetched", data: lid_status });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching lid_status" });
  };
};

// --------------update Lid_status---------------
const updateLidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLidStatus = await Lid_status.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLidStatus) {
      return res.status(404).json({ success: false, message: "Lid_status not found" });
    }

    res.status(200).json({ success: true, message: "Lid_status updated successfully", data: updatedLidStatus });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Lid_status" });
  }
};


// ------------delete Lid_status----------------
const deleteLidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLidStatus = await Lid_status.findByIdAndDelete(id);

    if (!deletedLidStatus) {
      return res.status(404).json({ success: false, message: "Lid_status not found" });
    }

    res.status(200).json({ success: true, message: "Lid_status deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchLidStatus = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Lid_status.find({
      $or: [
        { status: { $regex: query, $options: "i" } }
      ]
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Lid_status not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching lid_status:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch lid_status" });
  }
};

module.exports = {
  addLid_status,
  getLid_status,
  getLidStatusById,
  updateLidStatus,
  deleteLidStatus,
  searchLidStatus
};
