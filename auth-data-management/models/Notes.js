const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    }
});

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;
