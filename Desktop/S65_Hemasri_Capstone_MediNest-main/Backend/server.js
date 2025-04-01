const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

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
app.get('/api/doctors', (req, res) => {
    res.json(doctors);
});

// GET endpoint to fetch a specific doctor by ID
app.get('/api/doctors/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === parseInt(req.params.id));
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ error: 'Doctor not found' });
    }
});

// GET endpoint to fetch all patients
app.get('/api/patients', (req, res) => {
    res.json(patients);
});

// GET endpoint to fetch a specific patient by ID
app.get('/api/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

// GET endpoint to fetch all appointments
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// GET endpoint to fetch a specific appointment by ID
app.get('/api/appointments/:id', (req, res) => {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (appointment) {
        res.json(appointment);
    } else {
        res.status(404).json({ error: 'Appointment not found' });
    }
});

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});