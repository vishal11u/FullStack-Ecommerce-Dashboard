const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
