const db = require("../models");
const passport = require("../config/passport");

// Defining methods for the booksController
module.exports = {
    authorize: function(req,res) {
        console.log(req.user);
        res.json(req.user);
    },
    getUser: function(req, res) {
        if (!req.user) {
            res.json({})
        } else {
            res.json({
                email: req.user.Email,
                _id: req.user.id
            })
        }
        /*db.User
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));*/
    },
    create: function(req, res) {
        db.User
        .create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbModel => {
            console.log(dbModel);
            res.json(dbModel);
            res.redirect("/app/login");
        })
        .catch(err => res.status(422).json(err));
    },
    logout: function(req,res) {
        req.logout();
        res.redirect("/");
    }
};
