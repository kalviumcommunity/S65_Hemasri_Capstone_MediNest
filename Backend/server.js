 get-api
const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

const app = express();
const Patient = require("./models/Patient");

app.use(express.json());

// Mock Data
const doctors = [
    { id: 1, name: 'Dr. Aditi Sharma', department: 'Neurology' },
    { id: 2, name: 'Dr. Rajesh Kumar', department: 'Orthopedics' }
];

const appointments = [
    { id: 1, patientId: 1, doctorId: 1, date: '2025-04-05' },
    { id: 2, patientId: 2, doctorId: 2, date: '2025-04-06' }
];

// Doctor endpoints
app.get('/api/doctors', (req, res) => {
    res.json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === parseInt(req.params.id));
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ error: 'Doctor not found' });
    }
});

// Patient endpoints (using MongoDB)
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

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

// Appointment endpoints
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

app.get('/api/appointments/:id', (req, res) => {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (appointment) {
        res.json(appointment);
    } else {
        res.status(404).json({ error: 'Appointment not found' });
    }
});

app.use("/api/patients", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

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
main
