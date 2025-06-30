const express = require("express");
const router = express.Router();
const { crawlManga } = require("../controllers/crawlerController");

router.post("/manga", crawlManga);

module.exports = router;
