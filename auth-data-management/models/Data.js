const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
