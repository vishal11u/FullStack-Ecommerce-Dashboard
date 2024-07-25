const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
// const jwt = require('jsonwebtoken');
console.log(Card);

// Authentication middleware
// const auth = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
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

// Create a new card
router.post('/', async (req, res) => {
    try {
        const card = new Card(req.body);
        await card.save();
        res.status(201).json(card);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all cards
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
