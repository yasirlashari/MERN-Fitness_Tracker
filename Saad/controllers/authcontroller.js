// authcontroller.js

const User = require('../models/user');  // Import the User model
const jwt = require('jsonwebtoken');     // Import JWT for token generation

// Helper function to generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',  // Token will expire in 30 days
    });
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists by email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the new user
    const token = generateToken(user._id);

    // Return a successful response with user data and token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,  // Send the token to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the logged-in user
    const token = generateToken(user._id);

    // Send the user data along with the token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,  // Send the token to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
