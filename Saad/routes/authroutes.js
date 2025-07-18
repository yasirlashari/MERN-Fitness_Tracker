// authroutes.js

const express = require('express');
const router = express.Router();

// Import the functions from the controller
const { registerUser, loginUser } = require('../controllers/authcontroller');

// Define the route for user registration
router.post('/register', registerUser);

// Define the route for user login
router.post('/login', loginUser);

// Export the router so it can be used in the main app
module.exports = router;
