const db = require("../models");

module.exports = {
    create: function(req,res) {
        //console.log("_ID", res.locals.user._id);
        db.Trip.create({
            name: req.body.name,
            destination: req.body.destination,
            flight: req.body.flight,
            date: req.body.date,
            category: req.body.category,
            budget: req.body.budget
        })
        .then(dbTrip => {
            console.log(dbTrip);
            res.json(dbTrip);
        });
    },

    getTrips: function(req,res) {
        res.json("TRIPS");
    }
}