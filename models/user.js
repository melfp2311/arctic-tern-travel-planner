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

UserSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
      },
      hashPassword: (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 6);
      },
}

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

