const Entry = require("../models/Entry");

const createEntry = async (req, res) => {
  try {
    const { title, entryBody, isPublic } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title can not be empty" });

    const createdEntry = await Entry.create({
      title: title,
      entryBody: entryBody,
      isPublic: isPublic,
      owner: req.user._id,
    });

    res.status(201).json(createdEntry);
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({
        message: err.message,
      });

    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getPublicEntries = async (req, res) => {
  try {
    const publicEntries = await Entry.find({ isPublic: true });

    res.status(200).json(publicEntries);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const myEntries = async (req, res) => {
  try {
    const myEntries = await Entry.find({
      owner: req.user._id,
    });

    res.status(200).json(myEntries);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const foundEntry = await Entry.findOne({
      _id: req.params.entryId,
    });

    if (!foundEntry.owner.equals(req.user._id))
      return res
        .status(403)
        .json({ message: "You Are Not Allowed To Delete This Entry" });

    const deletedEntry = await Entry.findByIdAndDelete(foundEntry._id);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOneEntry = async (req, res) => {
  try {
    const foundEntry = await Entry.findById(req.params.entryId);

    res.status(200).json(foundEntry);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateEntry = async (req, res) => {
  try {
    const foundEntry = await Entry.findOne({
      _id: req.params.entryId,
    });

    if (!foundEntry.owner.equals(req.user._id))
      return res
        .status(403)
        .json({ message: "You Are Not Allowed To Update This Entry" });

    const { title, entryBody, isPublic } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(
      foundEntry._id,
      {
        title: title,
        entryBody: entryBody,
        isPublic: isPublic,
      },
      { returnDocument: "after", runValidator: true },
    );

    res.status(200).json(updatedEntry);
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ message: err.message });

    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createEntry,
  getPublicEntries,
  myEntries,
  deleteEntry,
  getOneEntry,
  updateEntry,
};
