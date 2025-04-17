const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

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

        // Optional: Skip this if not needed — create() already returns the doc
        const savedDoctor = await Doctor.findById(doctor._id);

        res.status(201).json({
            success: true,
            message: 'Doctor added successfully',
            data: savedDoctor
        });
    } catch (error) {
        console.error('Doctor creation error:', error);
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
        console.error('Patient creation error:', error);
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

        // Input validation
        if (!patientId || !doctorId || !appointmentDate || !timeSlot || !reason) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Check if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Check for existing appointment
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate,
            timeSlot,
            status: 'Scheduled'
        });

        if (existingAppointment) {
            return res.status(409).json({
                success: false,
                message: 'Time slot already booked'
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
        console.error('Appointment creation error:', error);
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