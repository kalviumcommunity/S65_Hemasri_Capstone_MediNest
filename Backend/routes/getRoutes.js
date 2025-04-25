const express = require('express');
const router = express.Router();
const Doctor = require('../models/DoctorModel');
const Patient = require('../models/PatientModel');
const Appointment = require('../models/AppointmentModel');

// GET endpoint to fetch all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
            error: error.message
        });
    }
});

// GET endpoint to fetch a specific doctor by ID
router.get('/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }
        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctor',
            error: error.message
        });
    }
});

// GET endpoint to fetch all patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patients',
            error: error.message
        });
    }
});

// GET endpoint to fetch a specific patient by ID
router.get('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patient',
            error: error.message
        });
    }
});

// GET endpoint to fetch all appointments with populated data
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate('doctorId', 'name department')
            .populate('patientId', 'name age');
            
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
            error: error.message
        });
    }
});

// GET endpoint to fetch a specific appointment by ID
router.get('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('doctorId', 'name department')
            .populate('patientId', 'name age');
            
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointment',
            error: error.message
        });
    }
});

module.exports = router;
