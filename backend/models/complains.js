import mongoose from 'mongoose';

const complainSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    complain_date: {
        type: Date,
        required: true,
    },
    purchased_date: {
        type: Date,
        required: true,
    },
    complain: {
        type: String,
        required: true,
    },
    terms: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        default: 'pending', // Default status is 'pending'
    },
    email: {
        type: String,
        // Assuming email is required for notifications
    }
});

const Complain = mongoose.model('Complain', complainSchema);

export default Complain;
