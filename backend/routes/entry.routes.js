const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const entryController = require("../controllers/entry.controller");

router.post("/", verifyToken, entryController.createEntry);

router.get("/", entryController.getPublicEntries);

router.get("/my-entries", verifyToken, entryController.myEntries);

router.delete("/:entryId", verifyToken, entryController.deleteEntry);

router.get("/:entryId", entryController.getOneEntry);

router.put("/:entryId", verifyToken, entryController.updateEntry);

module.exports = router;
