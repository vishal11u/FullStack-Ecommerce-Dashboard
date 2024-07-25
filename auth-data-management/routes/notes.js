const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');

router.post('/', async (req, res) => {
    try {
        const note = new Notes(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const note = await Notes.find();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { message } = req.body;
    try {
        const data = await Notes.findByIdAndUpdate(req.params.id, { message }, { new: true });
        if (!data) {
            return res.status(404).send('Data not found');
        }
        res.json(data);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Notes.findByIdAndDelete(req.params.id);

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