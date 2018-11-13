const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define our model
// email - only unique strings, convert to lowercase on save
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  passoword: String,
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
