const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const mangaRoutes = require("./routes/manga");
const crawlRoutes = require("./routes/crawler");
const chapterRoutes = require("./routes/chapter");
app.use("/api/manga", mangaRoutes);
app.use("/api/crawl", crawlRoutes);
app.use("/api/chapter", chapterRoutes);
// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
