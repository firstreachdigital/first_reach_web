const express = require("express");
const router  = express.Router();
const { getStats, getChartData } = require("../controllers/statsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",      protect, getStats);
router.get("/chart", protect, getChartData);

module.exports = router;
