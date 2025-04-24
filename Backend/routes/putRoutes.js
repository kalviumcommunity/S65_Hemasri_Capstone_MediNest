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

put-api

router.put('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { name, department } = req.body;
    const doctor = doctors.find(d => d.id === parseInt(id));

 main

// PUT endpoint to update a doctor
router.put('/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department } = req.body;
        const doctor = doctors.find(d => d.id === parseInt(id));

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found here!!!' });
        }

        if (name) doctor.name = name;
        if (department) doctor.department = department;

        res.status(200).json({ message: 'Doctor updated successfully', doctor });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update doctor', details: error.message });
    }
});

 put-api
// PUT endpoint to update a patient 
router.put('/patients/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const patient = patients.find(p => p.id === parseInt(id));

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });

// PUT endpoint to update a patient
router.put('/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        const patient = patients.find(p => p.id === parseInt(id));

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        if (name) patient.name = name;
        if (age) {
            if (age < 0 || age > 120) {
                return res.status(400).json({ error: 'Invalid age value' });
            }
            patient.age = age;
        }

        res.status(200).json({ message: 'Patient updated successfully', patient });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update patient', details: error.message });
 main
    }
});

// PUT endpoint to update an appointment
router.put('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { patientId, doctorId, date } = req.body;
        const appointment = appointments.find(a => a.id === parseInt(id));

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        if (patientId) {
            const patientExists = patients.find(p => p.id === patientId);
            if (!patientExists) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            appointment.patientId = patientId;
        }

        if (doctorId) {
            const doctorExists = doctors.find(d => d.id === doctorId);
            if (!doctorExists) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            appointment.doctorId = doctorId;
        }

        if (date) {
            const appointmentDate = new Date(date);
            if (isNaN(appointmentDate)) {
                return res.status(400).json({ error: 'Invalid date format' });
            }
            appointment.date = date;
        }

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update appointment', details: error.message });
    }
});

module.exports = router;
