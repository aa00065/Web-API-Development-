const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize Express app
const app = express();

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API',
      version: '1.0.0',
      description: 'API for managing recipes',
      contact: {
        name: 'lets cook Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000/',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/recipeRoutes.js','./routes/authRoutes.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
