const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor name is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: ['Neurology', 'Cardiology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Gynaecology', ]
    },
    experience: {
        type: Number,
        required: [true, 'Years of experience is required']
    },
    qualification: {
        type: String,
        required: [true, 'Qualification is required']
    },
    availableDays: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);