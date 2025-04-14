const express = require('express');
const router = express.Router();

// Mock Data
const doctors = [
    { id: 1, name: 'Dr. Aditi Sharma', department: 'Neurology' },
    { id: 2, name: 'Dr. Rajesh Kumar', department: 'Orthopedics' }
];

const patients = [
    { id: 1, name: 'Aarav Mehta', age: 25 },
    { id: 2, name: 'Ishita Verma', age: 32 }
];

const appointments = [
    { id: 1, patientId: 1, doctorId: 1, date: '2025-04-05' },
    { id: 2, patientId: 2, doctorId: 2, date: '2025-04-06' }
];

// GET endpoint to fetch all doctors
router.get('/doctors', async (req, res) => {
    try {
        console.log('GET /doctors route accessed');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to fetch a specific doctor by ID
router.get('/doctors/:id', async (req, res) => {
    try {
        const doctor = doctors.find(d => d.id === parseInt(req.params.id));
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to fetch all patients
router.get('/patients', async (req, res) => {
    try {
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to fetch a specific patient by ID
router.get('/patients/:id', async (req, res) => {
    try {
        const patient = patients.find(p => p.id === parseInt(req.params.id));
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to fetch all appointments
router.get('/appointments', async (req, res) => {
    try {
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to fetch a specific appointment by ID
router.get('/appointments/:id', async (req, res) => {
    try {
        const appointment = appointments.find(a => a.id === parseInt(req.params.id));
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
