const { group_stuff: Group_stuff } = require("../model/group_stuffSchema");

// -------------add Group_stuff------------
const addGroup_stuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;

    const newGroup_stuff = new Group_stuff({
      group_id,
      stuff_id
    });

    await newGroup_stuff.save();
    res.status(201).json({ success: true, message: "Group_stuff successfully added", data: newGroup_stuff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while adding Group_stuff" });
  }
};

// -------------------Get Group_stuff---------------
const getGroup_stuff = async (req, res) => {
  try {
    const group_stuffs = await Group_stuff.find().populate("group_id stuff_id");
    if (!group_stuffs || group_stuffs.length === 0) {
      return res.status(404).json({ success: false, message: "Group_stuff not found" });
    }
    res.status(200).json({ success: true, message: "All group_stuffs fetched", data: group_stuffs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching group_stuff" });
  }
};

// ----------------get Group_stuff by ID -----------------------
const getGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;

    const group_stuff = await Group_stuff.findById(id).populate("group_id stuff_id");
    if (!group_stuff) {
      return res.status(404).json({ success: false, message: "Group_stuff not found" });
    }
    res.status(200).json({ success: true, message: "Group_stuff fetched", data: group_stuff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while fetching group_stuff" });
  };
};

// --------------update Group_stuff---------------
const updateGroupStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id, stuff_id } = req.body;

    const updatedGroupStuff = await Group_stuff.findByIdAndUpdate(
      id,
      { group_id, stuff_id },
      { new: true }
    ).populate("group_id stuff_id");

    if (!updatedGroupStuff) {
      return res.status(404).json({ success: false, message: "Group_stuff not found" });
    }

    res.status(200).json({ success: true, message: "Group_stuff updated successfully", data: updatedGroupStuff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error while updating Group_stuff" });
  }
};


// ------------delete Group_stuff----------------
const deleteGroupStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroupStuff = await Group_stuff.findByIdAndDelete(id);

    if (!deletedGroupStuff) {
      return res.status(404).json({ success: false, message: "Group_stuff not found" });
    }

    res.status(200).json({ success: true, message: "Group_stuff deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addGroup_stuff,
  getGroup_stuff,
  getGroupStuffById,
  updateGroupStuff,
  deleteGroupStuff
};
