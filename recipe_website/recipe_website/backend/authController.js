const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../backend/models/User'); // Adjust the path as necessary


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!username || !password) {
      return res.status(400).json({ msg: 'Both username and password are required' });
  }
      if (!user) {
          return res.status(400).json({ msg: 'Invalid username' });
      }

const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
      const payload = { user: { id: user._id, username: user.username } };

      const token = jwt.sign({id: user._id}, payload,'secret');

      res.json({ token, id:user._id, msg: 'Login successful' });

  }

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const user = await User.findOne({ username, email });
      if (user) {
          return res.status(400).json({ msg: 'Username or email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      
      const payload = {
          user: {
              id: newUser._id,
              username: newUser.username
          }
      };

      const token = jwt.sign(payload, 'secret', { expiresIn: 3600 });
      res.status(201).json({ token, msg: 'User created successfully' });
  } catch (error) {
      if (error.code === 11000) {
          return res.status(400).json({ msg: 'Email already in use', field: 'email' });
      }
      console.error('Signup Error:', error);
      res.status(500).json({ msg: 'Error signing up', error: error.message });
  }
};
