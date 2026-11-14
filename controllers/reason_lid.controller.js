const { reason_lid } = require("../model/reason_lidSchema");

// -------------add Reason_lid------------
const addReason_lid = async (req, res) => {
  try {
    const { reason_lid: reason } = req.body;

    const newReason_lid = new reason_lid({
      reason_lid: reason
    });

    await newReason_lid.save();
    res.status(201).json({ success: true, message: "Reason_lid successfully added", data: newReason_lid });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Reason_lid" });
  }
};

// -------------------Get Reason_lid---------------
const getReason_lid = async (req, res) => {
  try {
    const reason_lids = await reason_lid.find();
    if (!reason_lids || reason_lids.length === 0) {
      return res.status(404).json({ success: false, message: "Reason_lid not found" });
    }
    res.status(200).json({ success: true, message: "All reason_lids fetched", data: reason_lids });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching reason_lid" });
  }
};

// ----------------get Reason_lid by ID -----------------------
const getReasonLidById = async (req, res) => {
  try {
    const { id } = req.params;

    const reason = await reason_lid.findById(id);
    if (!reason) {
      return res.status(404).json({ success: false, message: "Reason_lid not found" });
    }
    res.status(200).json({ success: true, message: "Reason_lid fetched", data: reason });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching reason_lid" });
  };
};

// --------------update Reason_lid---------------
const updateReasonLid = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_lid: reason } = req.body;

    const updatedReasonLid = await reason_lid.findByIdAndUpdate(
      id,
      { reason_lid: reason },
      { new: true }
    );

    if (!updatedReasonLid) {
      return res.status(404).json({ success: false, message: "Reason_lid not found" });
    }

    res.status(200).json({ success: true, message: "Reason_lid updated successfully", data: updatedReasonLid });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Reason_lid" });
  }
};


// ------------delete Reason_lid----------------
const deleteReasonLid = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReasonLid = await reason_lid.findByIdAndDelete(id);

    if (!deletedReasonLid) {
      return res.status(404).json({ success: false, message: "Reason_lid not found" });
    }

    res.status(200).json({ success: true, message: "Reason_lid deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addReason_lid,
  getReason_lid,
  getReasonLidById,
  updateReasonLid,
  deleteReasonLid
};
