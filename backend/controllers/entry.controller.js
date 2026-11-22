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
    res.json(err);
  }
};

const getPublicEntries = async (req, res) => {
  try {
    const publicEntries = await Entry.find({ isPublic: true });

    if (publicEntries.length === 0)
      return res.status(200).json({ message: "NO Public Entries" });

    res.status(200).json(publicEntries);
  } catch (err) {
    res.json(err);
  }
};

const myEntries = async (req, res) => {
  try {
    const myEntries = await Entry.find({
      owner: req.user._id,
    });

    if (myEntries.length === 0)
      return res.status(200).json({ message: "You Have No Entries" });

    res.status(200).json(myEntries);
  } catch (err) {
    res.json(err);
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
    res.json(err);
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
      { returnDocument: "after" },
    );

    res.status(200).json(updatedEntry);
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  createEntry,
  getPublicEntries,
  myEntries,
  deleteEntry,
  updateEntry,
};
