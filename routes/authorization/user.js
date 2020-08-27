const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require("../../config/passport");

router.route("/signup").post(usersController.create);
router.route("/login").post(passport.authenticate("local"), usersController.authorize);
router.route("/user").get(usersController.getUser);
router.route("/user/:id").get(usersController.loggedUser);
router.route("/logout").get(usersController.logout);

module.exports = router;