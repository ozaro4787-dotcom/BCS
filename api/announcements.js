const express = require('express');
const router = express.Router();

// Sample data storage for announcements
let announcements = [];

// Route to get all announcements
router.get('/', (req, res) => {
    res.json(announcements);
});

// Route to create a new announcement
router.post('/', (req, res) => {
    const { title, message } = req.body;
    const newAnnouncement = { title, message, createdAt: new Date() };
    announcements.push(newAnnouncement);
    res.status(201).json(newAnnouncement);
});

// Route to delete an announcement by index
router.delete('/:index', (req, res) => {
    const index = req.params.index;
    if (index < 0 || index >= announcements.length) {
        return res.status(404).json({ error: 'Announcement not found' });
    }
    announcements.splice(index, 1);
    res.status(204).send();
});

module.exports = router;