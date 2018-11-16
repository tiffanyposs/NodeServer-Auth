/* eslint func-names: ["error", "never"] */
/* eslint prefer-arrow-callback: "error" */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

// Define our model
// email - only unique strings, convert to lowercase on save
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// on save hook encrypt password
// Before saving the model run this function (hook)
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this; // user.email user.password

  // generate a "salt" then run callback
  // a salt is a randomly generated string of characters
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // hash (encrypt) our password using salt
    bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) return next(err2);

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
