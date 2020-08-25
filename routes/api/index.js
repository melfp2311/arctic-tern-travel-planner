const router = require("express").Router();
const userRoutes = require("../authorization/users");

// Book routes
router.use("/users", userRoutes);

module.exports = router;
