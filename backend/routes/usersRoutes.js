const express = require("express");
const router  = express.Router();
const { getAll, create, update, remove } = require("../controllers/usersController");
const { protect, requireRole } = require("../middleware/authMiddleware");

const superAdminOnly = [protect, requireRole("superadmin")];

router.get("/",       ...superAdminOnly, getAll);
router.post("/",      ...superAdminOnly, create);
router.put("/:id",    ...superAdminOnly, update);
router.delete("/:id", ...superAdminOnly, remove);

module.exports = router;
