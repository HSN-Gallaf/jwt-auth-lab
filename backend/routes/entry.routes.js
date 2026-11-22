const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const entryController = require("../controllers/entry.controller");

router.post("/", verifyToken, entryController.createEntry);

router.get("/", verifyToken, entryController.getPublicEntries);

router.get("/my-entries", verifyToken, entryController.myEntries);

router.delete("/:entryId", verifyToken, entryController.deleteEntry);

router.put("/:entryId", verifyToken, entryController.updateEntry);

module.exports = router;
