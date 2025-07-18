const mongoose = require('mongoose');

// Define the schema for tracking user's progress
const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',  // Reference name for the User model
    required: true
  },
  date: {
    type: Date,
    default: Date.now  // Default to the current date/time
  },
  weight: {
    type: Number  // User's weight in kg/lbs
  },
  bodyFat: {
    type: Number  // Body fat percentage
  },
  runTime: {
    type: Number  // Run time in minutes
  },
  liftingPRs: {
    bench: {
      type: Number  // Personal record for bench press
    },
    squat: {
      type: Number  // Personal record for squat
    },
    deadlift: {
      type: Number  // Personal record for deadlift
    }
  },
  notes: {
    type: String  // Any additional notes from the user
  }
}, {
  timestamps: true  // Automatically add createdAt and updatedAt fields
});

// Create and export the model
module.exports = mongoose.model('Progress', progressSchema);
