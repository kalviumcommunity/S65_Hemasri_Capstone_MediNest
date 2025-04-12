const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Import Routes
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');
const putRoutes = require('./routes/putRoutes');
const patientRoutes = require('./get-api'); // the one with MongoDB-based patient fetching

// Use Routes
app.use('/api', getRoutes);
app.use('/api', postRoutes);
app.use('/api', putRoutes);
app.use('/api/patients', patientRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
