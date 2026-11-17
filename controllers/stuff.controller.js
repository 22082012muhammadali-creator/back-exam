const { Stuff } = require("../model/stuffSchema");

// -------------add Stuff------------
const addStuff = async (req, res) => {
  try {
    const { firstname, lastname, phone_number, login, parol, is_active } = req.body;

    const newStuff = new Stuff({
      firstname, 
      lastname, 
      phone_number, 
      login, 
      parol, 
      is_active
    });

    await newStuff.save();
    res.status(201).json({ success: true, message: "Stuff successfully added", data: newStuff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Stuff" });
  }
};

// -------------------Get Stuff---------------
const getStuff = async (req, res) => {
  try {
    const stuffs = await Stuff.find();
    if (!stuffs || stuffs.length === 0) {
      return res.status(404).json({ success: false, message: "Stuff not found" });
    }
    res.status(200).json({ success: true, message: "All stuffs fetched", data: stuffs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching stuff" });
  }
};

// ----------------get Stuff by ID -----------------------
const getStuffById = async (req, res) => {
  try {
    const { id } = req.params;

    const stuff = await Stuff.findById(id);
    if (!stuff) {
      return res.status(404).json({ success: false, message: "Stuff not found" });
    }
    res.status(200).json({ success: true, message: "Stuff fetched", data: stuff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching stuff" });
  }
};

// --------------update Stuff---------------
const updateStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, phone_number, login, parol, is_active } = req.body;

    const updatedStuff = await Stuff.findByIdAndUpdate(
      id,
      { firstname, lastname, phone_number, login, parol, is_active },
      { new: true }
    );

    if (!updatedStuff) {
      return res.status(404).json({ success: false, message: "Stuff not found" });
    }

    res.status(200).json({ success: true, message: "Stuff updated successfully", data: updatedStuff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Stuff" });
  }
};


// ------------delete Stuff----------------
const deleteStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStuff = await Stuff.findByIdAndDelete(id);

    if (!deletedStuff) {
      return res.status(404).json({ success: false, message: "Stuff not found" });
    }

    res.status(200).json({ success: true, message: "Stuff deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const searchStuff = async (req, res) => {
  try {
    const query = req.query.query || req.query.search_query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Stuff.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } }
      ]
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Stuff not found" });
    }

    res.status(200).json({ success: true, inner_data: result });
  } catch (err) {
    console.error("Error fetching stuff:", err);
    res.status(500).json({ success: false, message: "Server error: Failed to fetch stuff" });
  }
};

module.exports = {
  addStuff,
  getStuff,
  getStuffById,
  updateStuff,
  deleteStuff,
  searchStuff
};