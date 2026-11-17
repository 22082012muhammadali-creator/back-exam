const { Branch } = require("../model/branchSchema");

// -------------add Branch------------
const addBranch = async (req, res) => {
  try {
    const { name, address, call_number } = req.body;

    const newBranch = new Branch({
      name,
      address,
      call_number
    });

    await newBranch.save();
    res.status(201).json({ success: true, message: "Branch successfully added", data: newBranch });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Branch" });
  }
};

// -------------------Get Branch---------------
const getBranch = async (req, res) => {
  try {
    const branchs = await Branch.find();
    if (!branchs || branchs.length === 0) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }
    res.status(200).json({ success: true, message: "All branchs fetched", data: branchs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching branch" });
  }
};

// ----------------get Branch by ID -----------------------
const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }
    res.status(200).json({ success: true, message: "Branch fetched", data: branch });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching branch" });
  }
};

// --------------update Branch---------------
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, call_number } = req.body;

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      { name, address, call_number },
      { new: true }
    );

    if (!updatedBranch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    res.status(200).json({ success: true, message: "Branch updated successfully", data: updatedBranch });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating branch" });
  }
};


// ------------delete Branch----------------
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBranch = await Branch.findByIdAndDelete(id);

    if (!deletedBranch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    res.status(200).json({ success: true, message: "Branch deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchBranch = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Branch.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { call_number: { $regex: query, $options: "i" } }
      ]
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching branch:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch branch" });
  }
};

module.exports = {
  addBranch,
  getBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
  searchBranch
};