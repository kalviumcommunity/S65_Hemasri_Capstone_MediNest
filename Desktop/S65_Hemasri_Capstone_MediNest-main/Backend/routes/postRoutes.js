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

// POST endpoint to add a new doctor
router.post('/doctors', async (req, res) => {
    try {
        const { name, department } = req.body;
        if (!name || !department) {
            return res.status(400).json({ error: 'Name and department are required' });
        }
        const newDoctor = { id: doctors.length + 1, name, department };
        doctors.push(newDoctor);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST endpoint to add a new patient
router.post('/patients', async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: 'Name and age are required' });
        }
        const newPatient = { id: patients.length + 1, name, age };
        patients.push(newPatient);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST endpoint to add a new appointment
router.post('/appointments', async (req, res) => {
    try {
        const { patientId, doctorId, date } = req.body;
        if (!patientId || !doctorId || !date) {
            return res.status(400).json({ error: 'Patient ID, Doctor ID, and date are required' });
        }
        const newAppointment = { id: appointments.length + 1, patientId, doctorId, date };
        appointments.push(newAppointment);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
