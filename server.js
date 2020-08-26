//Dependencies
const express = require("express");
const passport = require("./config/passport");
const compression = require('compression');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
var bodyParser = require('body-parser');

require("dotenv").config();

//Set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express session
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tripslist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
