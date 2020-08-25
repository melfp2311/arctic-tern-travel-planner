const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require("../../config/passport");

router.route("/signup").post(usersController.create);
router.route("/login").post(usersController.authorize, passport.authenticate("local"));
router.route("/user").get(usersController.getUser);
router.route("/logout").get(usersController.logout);

module.exports = router;