const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a notification
router.post('/', async (req, res) => {
    const { message, date, time, user, role } = req.body;

    try {
        const newNotification = new Notification({ message, date, time, user, role });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
});

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// Get count of unread notifications
router.get('/unread/count', async (req, res) => {
    try {
        const count = await Notification.countDocuments({ isRead: false });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get unread notifications count' });
    }
});

// Mark all notifications as read
router.post('/mark-all-read', async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { $set: { isRead: true } });
        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notifications as read' });
    }
});

module.exports = router;