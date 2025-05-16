const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative'],
        max: [120, 'Please enter a valid age']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other']
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    // Relationships
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    assignedDoctors: [{
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        since: {
            type: Date,
            default: Date.now
        }
    }],
    medicalHistory: [{
        condition: String,
        diagnosis: String,
        treatment: String,
        date: Date,
        treatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    }]
}, {
    timestamps: true
});

// Populate middleware
patientSchema.pre('find', function(next) {
    this.populate('appointments');
    this.populate('assignedDoctors.doctor');
    next();
});

module.exports = mongoose.model('Patient', patientSchema);