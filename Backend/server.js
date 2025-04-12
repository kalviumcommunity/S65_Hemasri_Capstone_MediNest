const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Import routes
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');

// Use routes
app.use('/api', getRoutes);
app.use('/api', postRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
