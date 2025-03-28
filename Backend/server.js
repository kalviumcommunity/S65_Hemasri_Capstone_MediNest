const express = require("express");
const app = express(); // Initialize the express app
const router = express.Router();
require("dotenv").config()
const Patient = require("./models/Patient"); // Importing the Patient model

app.use(express.json())

// @desc Get all patients
// @route GET /api/patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single patient by ID
// GET /api/patients/:id
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.use("/api/patients", router); // Mount the router to the app

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;


