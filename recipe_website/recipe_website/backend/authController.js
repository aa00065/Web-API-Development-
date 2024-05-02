const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../backend/models/User'); // Adjust the path as necessary


exports.loginUser = async (req, res) => {
    const { username, password } = req.body; 
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ id: user.id }, "your_secret_key", { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, secure: true });
        return res.status(200).json({ message: "User logged in", id: user.id });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body; 
    try {
        const user = await User.findOne({ username }); 

        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ username, password: hashPassword }); 
        await newUser.save();

        return res.status(201).json({ message: "User successfully registered" });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
