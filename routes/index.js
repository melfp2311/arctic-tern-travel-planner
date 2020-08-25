const path = require("path");
const router = require("express").Router();
const AuthRoutes = require("./authorization/index");

// API Routes
router.use("/api", AuthRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
