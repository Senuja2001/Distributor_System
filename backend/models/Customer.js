import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    customerName: { 
        type: String,   
        required: true 
    },  // Matches customerName
    emailAddress: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Basic email validation
    }, // Matches emailAddress
    telephoneNumber: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);  // Example: 10-digit phone number validation
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }, // Matches telephoneNumber
    distributorCode: { 
        type: String 
    }, // Optional field for distributor code
    customerCode: { 
        type: String 
    }, // Optional field for customer code
    openAccountDate: { 
        type: Date 
    }, // Optional field for open account date
    registrationNumber: { 
        type: String 
    }, // Optional field for registration number
    type: { 
        type: String, 
        required: true, 
        enum: ['Cash', 'Credit'] // Restricts allowed values
    }, // Matches type
    status: { 
        type: String, 
        required: true, 
        enum: ['Active', 'Inactive'] // Restricts allowed values
    }, // Matches status
    contactPerson: { 
        type: String 
    }, // Optional field for contact person
    additionalTelephoneNumber: { 
        type: String,
        validate: {
            validator: function(v) {
                return !v || /^\d{10}$/.test(v); // Validate only if a value is provided
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }, // Optional additional telephone number field
    emailNotification: { 
        type: Boolean, 
        default: false 
    }, // Default value for email notification
    imageUri: { 
        type: String 
    }, // Optional field for image URI (Base64-encoded string)
    sales: { 
        type: Map,
        of: {
            target: { type: Number, default: 0 },  // Sales target for a month
            achievement: { type: Number, default: 0 }  // Sales achievement for a month
        }
    } // Stores sales data for each month (e.g., { '2024-01': { target: 10000, achievement: 9000 } })
});

// Handling unique validation errors for email
customerSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Email already exists, please use a different email.'));
    } else {
        next(error);
    }
});

export default mongoose.model('Customer', customerSchema);
