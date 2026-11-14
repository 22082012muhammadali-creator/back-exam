const { StuffRole } = require("../model/stuff_roleSchema");

// -------------add Stuff_role------------
const addStuff_role = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;

    const newStuff_role = new StuffRole({
      stuff_id,
      role_id
    });

    await newStuff_role.save();
    res.status(201).json({ success: true, message: "Stuff_role successfully added", data: newStuff_role });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Stuff_role" });
  }
};

// -------------------Get Stuff_role---------------
const getStuff_role = async (req, res) => {
  try {
    const stuff_roles = await StuffRole.find();
    if (!stuff_roles || stuff_roles.length === 0) {
      return res.status(404).json({ success: false, message: "Stuff_role not found" });
    }
    res.status(200).json({ success: true, message: "All stuff_roles fetched", data: stuff_roles });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching stuff_role" });
  }
};

// ----------------get StuffRole by ID -----------------------
const getStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const stuff_role = await StuffRole.findById(id).populate("stuff_id role_id");
    if (!stuff_role) {
      return res.status(404).json({ success: false, message: "Stuff_role not found" });
    }
    res.status(200).json({ success: true, message: "Stuff_role fetched", data: stuff_role });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching stuff_role" });
  }
};

// --------------update Stuff_role---------------
const updateStuffRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { stuff_id, role_id } = req.body;

    const updatedStuffRole = await StuffRole.findByIdAndUpdate(
      id,
      { stuff_id, role_id },
      { new: true }
    );

    if (!updatedStuffRole) {
      return res.status(404).json({ success: false, message: "Stuff_role not found" });
    }

    res.status(200).json({ success: true, message: "Stuff_role updated successfully", data: updatedStuffRole });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Stuff_role" });
  }
};


// ------------delete StuffRole----------------
const deleteStuffRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStuffRole = await StuffRole.findByIdAndDelete(id);

    if (!deletedStuffRole) {
      return res.status(404).json({ success: false, message: "Stuff_role not found" });
    }

    res.status(200).json({ success: true, message: "Stuff_role deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addStuff_role,
  getStuff_role,
  getStuffRoleById,
  updateStuffRole,
  deleteStuffRole
};