const express = require('express');
const router = express.Router();

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
    }
});

module.exports = router;
