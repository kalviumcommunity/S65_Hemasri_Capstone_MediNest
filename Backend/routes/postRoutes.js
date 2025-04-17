const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/DoctorModel');
const Patient = require('../models/PatientModel');
const Appointment = require('../models/AppointmentModel');

// POST endpoint to add a new doctor
router.post('/doctors', async (req, res) => {
    try {
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
    }
});

// POST endpoint to add a new patient
router.post('/patients', async (req, res) => {
    try {
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
    }
});

// POST endpoint to add a new appointment
router.post('/appointments', async (req, res) => {
    try {
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
    }
});

module.exports = router;
