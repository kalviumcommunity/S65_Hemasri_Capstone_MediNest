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
        
        if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid doctor or patient ID format'
            });
        }

        const appointment = await Appointment.create({
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
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create appointment',
            error: error.message
        });
    }
});

module.exports = router;