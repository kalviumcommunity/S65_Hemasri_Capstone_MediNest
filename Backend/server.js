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

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

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

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MediNest API',
        endpoints: {
            doctors: '/api/doctors',
            patients: '/api/patients',
            appointments: '/api/appointments'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        requestedPath: req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        message: err.message
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
