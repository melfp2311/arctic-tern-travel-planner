const db = require("../models");
var passport = require("../config/passport");

// Defining methods for the booksController
module.exports = {
    authorize: function(req,res) {
        res.json(req.user);
    },
    getUser: function(req, res) {
        if (!req.user) {
            res.json({})
        } else {
            res.json({
                email: req.user.email,
                _id: req.user.id
            })
        }
        /*db.User
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));*/
    },
    getUser: function(req, res) {
        if (!req.user) {
            res.json({})
        } else {
            res.json({
                email: req.user.email,
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
            res.json(dbModel); //Can't have two res
            res.redirect("/app/login");
        })
        .catch(err => res.status(422).json(err));
    },
    logout: function(req,res) {
        console.log(req);
        req.logout();
        res.redirect("/");
    }
};
