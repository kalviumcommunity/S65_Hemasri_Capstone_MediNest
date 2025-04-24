const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import Routes
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');
const putRoutes = require('./routes/putRoutes');

// Use Routes
app.use('/api', getRoutes);
app.use('/api', postRoutes);
app.use('/api', putRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
