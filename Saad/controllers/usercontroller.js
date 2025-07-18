// controllers/usercontroller.js

const User = require('../models/user');

// Get the profile of the logged-in user
exports.getProfile = async (req, res) => {
  try {
    // Find the user by ID (using the ID from the authenticated user)
    const user = await User.findById(req.user.id).select('-password'); // Don't include the password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send the user's data (excluding password)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the profile of the logged-in user
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // Find user by ID
    if (user) {
      // Update user data with new values or keep the old ones
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.profilePicture = req.body.profilePicture || user.profilePicture;
      user.preferences = { ...user.preferences, ...req.body.preferences };  // Merge preferences

      const updatedUser = await user.save();  // Save updated user
      res.json(updatedUser);  // Return updated user data
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
