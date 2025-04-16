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
    medicalHistory: [{
        condition: String,
        diagnosis: String,
        treatment: String,
        date: Date
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);