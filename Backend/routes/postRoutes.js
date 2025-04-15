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
router.post('/doctors', (req, res) => {
    const { name, department } = req.body;
    
    if (!name || !department) {
        return res.status(400).json({ error: 'Name and department are required' });
    }

    const newDoctor = {
        id: doctors.length + 1,
        name,
        department
    };

    doctors.push(newDoctor);
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
});

// POST endpoint to add a new patient
router.post('/patients', (req, res) => {
    const { name, age } = req.body;
    
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }

    const newPatient = {
        id: patients.length + 1,
        name,
        age
    };

    patients.push(newPatient);
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
});

// POST endpoint to create a new appointment
router.post('/appointments', (req, res) => {
    const { patientId, doctorId, date } = req.body;
    
    if (!patientId || !doctorId || !date) {
        return res.status(400).json({ error: 'PatientId, doctorId and date are required' });
    }

    // Validate if doctor and patient exist
    const doctorExists = doctors.some(d => d.id === parseInt(doctorId));
    const patientExists = patients.some(p => p.id === parseInt(patientId));

    if (!doctorExists || !patientExists) {
        return res.status(404).json({ error: 'Doctor or Patient not found' });
    }

    const newAppointment = {
        id: appointments.length + 1,
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        date
    };

    appointments.push(newAppointment);
    res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
});

module.exports = router;