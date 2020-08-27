const router = require("express").Router();
const tripRoutes = require("./trips");

router.use("/trip", tripRoutes);

module.exports = router;