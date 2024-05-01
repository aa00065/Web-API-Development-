const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../authController'); // Adjust the path as necessary

router.post('/login', loginUser);
router.post('/signup', registerUser);

module.exports = router;
