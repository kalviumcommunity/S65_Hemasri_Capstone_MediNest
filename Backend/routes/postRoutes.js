const express = require("express");
const router = express.Router();

 database-schema
const Doctor = require('../models/DoctorModel');
const Patient = require('../models/PatientModel');
const Appointment = require('../models/AppointmentModel');

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
 main

// POST endpoint to add a new doctor
router.post('/doctors', async (req, res) => {
    try {
 database-schema
        const doctor = await Doctor.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Doctor added successfully',
            data: doctor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to add doctor',
            error: error.message
        });

        const { name, department } = req.body;
        if (!name || !department) {
            return res.status(400).json({ error: 'Name and department are required' });
        }

        const newDoctor = { id: doctors.length + 1, name, department };
        doctors.push(newDoctor);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add doctor', details: error.message });
 main
    }
});

// POST endpoint to add a new patient
router.post('/patients', async (req, res) => {
    try {
 database-schema
        const patient = await Patient.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Patient added successfully',
            data: patient
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to add patient',
            error: error.message
        });
      
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: 'Name and age are required' });
        }

        const newPatient = { id: patients.length + 1, name, age };
        patients.push(newPatient);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add patient', details: error.message });
 main
    }
});

// POST endpoint to add a new appointment
router.post('/appointments', async (req, res) => {
    try {
 database-schema
        const { patientId, doctorId, appointmentDate, timeSlot, reason } = req.body;

        // Validate required fields
        if (!patientId || !doctorId || !appointmentDate || !timeSlot || !reason) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: patientId, doctorId, appointmentDate, timeSlot, reason'
            });
        }

        // Check if doctor exists
        const doctorExists = await Doctor.findById(doctorId);
        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Check if patient exists
        const patientExists = await Patient.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Create appointment
        const newAppointment = await Appointment.create({
            patientId,
            doctorId,
            appointmentDate,
            timeSlot,
            reason,
            status: 'Scheduled'
        });

        res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            data: newAppointment
        });

    } catch (error) {
        // Check if error is a MongoDB validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create appointment',
            error: error.message
        });
        const { patientId, doctorId, date } = req.body;
        if (!patientId || !doctorId || !date) {
            return res.status(400).json({ error: 'Patient ID, Doctor ID, and date are required' });
        }

        // Validate if doctor and patient exist
        const doctorExists = doctors.find(doc => doc.id === doctorId);
        const patientExists = patients.find(pat => pat.id === patientId);

        if (!doctorExists || !patientExists) {
            return res.status(404).json({ error: 'Doctor or Patient not found' });
        }

        const newAppointment = { id: appointments.length + 1, patientId, doctorId, date };
        appointments.push(newAppointment);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment', details: error.message });
 main
    }
});

module.exports = router;