const express = require('express');
const router = express.Router();
const { loginUser, registerUser,logoutUser } = require('../authController'); // Adjust the path as necessary




/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user by checking their credentials and returns a token if successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         description: Authentication failed
 */





/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Error in registration process
 */





/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout a user
 *     description: Ends the user session and clears the authentication token.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: User not logged in
 */

















router.post('/login', loginUser);
router.post('/signup', registerUser);
// router.get('/logout', logoutUser);

module.exports = router;
