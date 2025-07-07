// routes/reader.js
const express = require("express");
const router = express.Router();
const { getAllImagesByMangaId } = require("../controllers/readerController");

router.get("/manga/:mangaid/full", getAllImagesByMangaId);
module.exports = router;
