import express from 'express';
import multer from 'multer';
import Customer from '../models/Customer.js';

const router = express.Router();

// Set up Multer to store the image in memory as a buffer
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // Limit file size to 1MB
}).single('image');

// Sales report route (place this before the ':id' route to avoid conflicts)
router.get('/sales-report', async (req, res) => {
    const { year, type } = req.query;

    if (!year || !type) {
        return res.status(400).json({ error: 'Year and type are required' });
    }

    try {
        // Find customers by type
        const customers = await Customer.find({ type });

        const reportData = customers.map(customer => {
            const salesData = {};
            for (let month = 1; month <= 12; month++) {
                const formattedMonth = month.toString().padStart(2, '0'); // Ensure two-digit month format
                salesData[formattedMonth] = customer.sales?.[`${year}-${formattedMonth}`] || { target: 0, achievement: 0 };
            }
            return {
                customerName: customer.customerName,
                sales: salesData
            };
        });

        res.status(200).json(reportData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new customer with Base64 image
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            // Convert image to Base64 string
            const imageBase64 = req.file ? req.file.buffer.toString('base64') : '';

            const newCustomer = new Customer({
                distributorCode: req.body.distributorCode,
                customerCode: req.body.customerCode,
                customerName: req.body.customerName,
                openAccountDate: req.body.openAccountDate,
                registrationNumber: req.body.registrationNumber,
                type: req.body.type,
                status: req.body.status,
                contactPerson: req.body.contactPerson,
                telephoneNumber: req.body.telephoneNumber,
                additionalTelephoneNumber: req.body.additionalTelephoneNumber,
                emailAddress: req.body.emailAddress,
                emailNotification: req.body.emailNotification || false,  // Default to false if not provided
                imageUri: imageBase64,  // Store Base64 string in MongoDB
                sales: req.body.sales || {}  // Initialize sales data (optional)
            });

            await newCustomer.save();
            res.status(201).json(newCustomer);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    });
});

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a customer with optional image upload
router.put('/:id', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const updates = { ...req.body }; 

            // Convert image to Base64 string if an image is provided
            if (req.file) {
                updates.imageUri = req.file.buffer.toString('base64');
            }

            console.log(updates);
            console.log("#######################################");
            delete updates.sales;
            
            const updatedCustomer = await Customer.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );

            if (!updatedCustomer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            res.status(200).json(updatedCustomer);
        } catch (error) {
            console.log(error);

            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    });
});

// Delete a customer
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
