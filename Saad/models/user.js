const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Fixed typo here
    trim: true,    // Ensures no extra spaces around the username
  },

  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
    lowercase: true,  // Converts email to lowercase
  },

  password: {
    type: String,
    required: true,  // Password is required for user registration
  },

  profilePicture: {
    type: String,
    default: '',  // Default empty string for profile picture
  },

  preferences: {
    units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },  // Default unit system
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },  // Default theme is light
    notifications: { type: Boolean, default: true },  // Notifications enabled by default
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields automatically
});

// Method to compare entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare entered password with the hashed password
};

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();  // If password is not modified, proceed without hashing
  }

  // Hash the password with bcrypt before saving
  const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password

  next();  // Proceed to save the user
});

// Create and export the User model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
