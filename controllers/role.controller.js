const { Role } = require("../model/roleSchema");

// ------------Add Role-------------
const addRole = async (req, res) => {
  try {
    const {
      name
    } = req.body;

    const newRole = new Role({
      name
    });
    
    await newRole.save();
    res.status(201).json({ success: true, message: "Role successfully added", inner_data: newRole });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding role" });
  }
};

// -----------------Get Roles------------------
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    if (!roles || roles.length === 0) {
      return res.status(404).json({ success: false, message: "404 not found: Roles not found" });
    }
    res.status(200).json({ success: true, message: "All roles fetched", inner_data: roles });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching roles" });
  }
};

// -----------Get role by id----------------------
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ success: false, message: "404 not found: Role not found" });
    }
    res.status(200).json({ success: true, message: "Role fetched", inner_data: role });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching role" });
  }
};

// -------------Update Role---------------
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    
    if (!updatedRole) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }
    
    res.status(200).json({ success: true, message: "Role updated successfully", data: { updatedRole } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating role" });
  }
};

// --------------Delete Role-------------
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (role) {
      res.status(200).json({ success: true, message: "Role deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Role not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchRole = async (req, res) => {
  try {
    const search_query = req.query.query || req.query.search_query;

    if (!search_query || typeof search_query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Role.find({
      $or: [
        { name: { $regex: search_query, $options: "i" } },
      ]
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Role topilmadi" });
    }
    
    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching role:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch role" });
  }
};

module.exports = {
  addRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  searchRole
};