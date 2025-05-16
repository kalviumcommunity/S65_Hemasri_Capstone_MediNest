const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient ID is required']
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Doctor ID is required']
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    timeSlot: {
        type: String,
        required: [true, 'Time slot is required']
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    reason: {
        type: String,
        required: [true, 'Reason for appointment is required']
    },
    prescription: {
        medicines: [{
            name: String,
            dosage: String,
            duration: String
        }],
        notes: String,
        givenAt: Date
    }
}, {
    timestamps: true
});

// Middleware to maintain relationships
appointmentSchema.post('save', async function(doc) {
    try {
        // Update doctor's appointments and patients
        await this.model('Doctor').findByIdAndUpdate(
            doc.doctorId,
            { 
                $addToSet: { 
                    appointments: doc._id,
                    patients: doc.patientId 
                }
            }
        );

        // Update patient's appointments and doctors
        await this.model('Patient').findByIdAndUpdate(
            doc.patientId,
            { 
                $addToSet: { 
                    appointments: doc._id,
                    'assignedDoctors.doctor': doc.doctorId 
                }
            }
        );
    } catch (error) {
        console.error('Error updating relationships:', error);
    }
});

// Auto-populate references
appointmentSchema.pre('find', function(next) {
    this.populate('patientId', 'name age gender')
        .populate('doctorId', 'name department');
    next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);