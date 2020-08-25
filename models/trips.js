const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating our User model
const TripSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    // The email cannot be null, and must be a proper email before creation
    destination: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    // The password cannot be null
    flight: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    day: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        trim: true
    },
    budget: {
        type: Number
    }
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;