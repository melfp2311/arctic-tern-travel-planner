// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating our User model
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    // The email cannot be null, and must be a proper email before creation
    email: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    // The password cannot be null
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    trips: [
        {
            type: Schema.Types.ObjectId,
            ref: "Trip"
        }
    ]
});

/*UserSchema.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
UserSchema.addHook("beforeCreate", function(user) {
user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});*/

UserSchema.methods = {
    validPassword: function (inputPassword) {
      return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: (plainTextPassword) => {
      return bcrypt.hashSync(plainTextPassword, 10);
    },
};
  
// Define hooks for pre-saving
UserSchema.pre("save", function (next) {
if (!this.password) {
    next();
} else {
    this.password = this.hashPassword(this.password);
    next();
}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

