const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor name is required'],
        trim: true
    },
    department: {
        type: String,
feature/db-relationships
        required: [true, 'Department is required']

        required: [true, 'Department is required'],
        enum: ['Neurology', 'Cardiology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Gynaecology', "Psychology"]
main
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
    },
    // Relationships
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }]
}, {
    timestamps: true
});

// Pre-save middleware to update relationships
doctorSchema.pre('save', async function(next) {
    if (this.isNew) {
        // Initialize empty arrays for new doctors
        this.appointments = [];
        this.patients = [];
    }
    next();
});

module.exports = mongoose.model('Doctor', doctorSchema);