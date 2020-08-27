// This is middleware for restricting routes a user is not allowed to visit if not logged in
const db = require("../../models");

module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      db.User.findById(req.user._id, (err, user) => {
        if (err) throw err;
        res.locals = { user: user };
      })
      return next();
    }
  
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/");
};
  