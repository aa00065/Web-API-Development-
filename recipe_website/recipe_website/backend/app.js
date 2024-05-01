const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(cors()); // Assuming CORS is needed for all routes
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb+srv://fakotrako321:pass123@recipes.dv2fhw8.mongodb.net/recipedB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// CORS configuration to accept requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Specify the origin of the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// BodyParser Middleware to parse JSON bodies
app.use(bodyParser.json());

// Import Routes
const recipeRoutes = require('./routes/recipeRoutes'); // Adjust path as needed
const authRoutes = require('./routes/authRoutes'); // Adjust path as needed
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);




// Set the port and start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;







