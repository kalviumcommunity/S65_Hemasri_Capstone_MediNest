const express = require('express');
const router = express.Router();

//mock data
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


router.put('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { name, department } = req.body;
    const doctor = doctors.find(d => d.id === parseInt(id));

    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }

    if (name) doctor.name = name;
    if (department) doctor.department = department;

    res.status(200).json({ message: 'Doctor updated successfully', doctor });
});

// PUT endpoint to update a patient 
router.put('/patients/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const patient = patients.find(p => p.id === parseInt(id));

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    if (name) patient.name = name;
    if (age) patient.age = age;

    res.status(200).json({ message: 'Patient updated successfully', patient });
});

// PUT endpoint to update an appointment
router.put('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, doctorId, date } = req.body;
    const appointment = appointments.find(a => a.id === parseInt(id));

    if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    if (patientId) appointment.patientId = patientId;
    if (doctorId) appointment.doctorId = doctorId;
    if (date) appointment.date = date;

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
});

module.exports = router;
