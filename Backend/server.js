const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/healthcareDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,  // "Doctor" or "Patient"
});

const User = mongoose.model("User", UserSchema);

// GET API Endpoint - Fetch all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from MongoDB
        res.json(users);  // Send response as JSON
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
