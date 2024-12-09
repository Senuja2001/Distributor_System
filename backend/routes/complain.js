import express from 'express';
import mongoose from 'mongoose';
import Complain from '../models/complains.js'; // Adjust the import for the model

const router = express.Router();

// Add a new complain
router.post('/add', async (req, res) => {
  const { firstName,email, lastName, username, city, code, complain_date, purchased_date, complain: complainText, terms } = req.body;

  const newComplain = new Complain({
    firstName,
    lastName,
    email,
    username,
    city,
    code,
    complain_date,
    purchased_date,
    complain: complainText,
    terms,
  });

  try {
    await newComplain.save();
    res.status(201).json({ message: 'Complain added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding complain' });
  }
});

// Get all complaints
router.get('/get', async (req, res) => {
  try {
    const complaints = await Complain.find();
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching complaints' });
  }
});

// Get a single complain by ID
router.get('/getId/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `Invalid ObjectId format for value "${id}"` });
  }

  try {
    const complain = await Complain.findById(id);
    if (!complain) {
      return res.status(404).json({ error: 'Complain not found' });
    }
    res.status(200).json(complain);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching complain' });
  }
});

// Update a complain by ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, city, code, complain_date, purchased_date, complain: complainText, terms } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `Invalid ObjectId format for value "${id}"` });
  }

  const updatedComplain = {
    firstName,
    lastName,
    username,
    city,
    code,
    complain_date,
    purchased_date,
    complain: complainText,
    terms,
  };

  try {
    const complain = await Complain.findByIdAndUpdate(id, updatedComplain, { new: true });
    if (!complain) {
      return res.status(404).json({ error: 'Complain not found' });
    }
    res.status(200).json({ message: 'Complain updated successfully', complain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating complain' });
  }
});

//update status
router.put('/status/:id', async(req, res) => {
  
  const { status } = req.body;
 try {
  const response = await Complain.findByIdAndUpdate(req.params.id, { status }, {new : true});
  res.json(response);
 } catch (error) {
  res.status(500).json({message: error.message});
  
 }


})

// Delete a complain by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `Invalid ObjectId format for value "${id}"` });
  }

  try {
    const complain = await Complain.findByIdAndDelete(id);
    if (!complain) {
      return res.status(404).json({ error: 'Complain not found' });
    }
    res.status(200).json({ message: 'Complain deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting complain' });
  }
});

export default router;
