const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const Data = require('../models/Data');

// Middleware to check token
// const auth = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'Authorization token is required' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'secretkey');
//         req.userId = decoded.userId;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// Get Data
router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add Data
router.post('/', async (req, res) => {
    const { name, contactNumber, email } = req.body;

    try {
        const newData = new Data({ name, contactNumber, email });
        await newData.save();
        res.json(newData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Data
router.put('/:id', async (req, res) => {
    const { name, contactNumber, email } = req.body;
    try {
        const data = await Data.findByIdAndUpdate(req.params.id, { name, contactNumber, email }, { new: true });
        if (!data) {
            return res.status(404).send('Data not found');
        }
        res.json(data);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Server Error');
    }
});

// Delete Data
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Data.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json({ message: 'Data deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;