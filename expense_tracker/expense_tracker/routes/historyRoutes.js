const express = require('express');
const router = express.Router();
const History = require('../models/history');
const mongoose = require('mongoose');

router.post('/addHistory', async (req, res) => {
    const { userID, type, description, amount, date } = req.body;

    try {
        const newHistory = new History({
            historyId: new mongoose.Types.ObjectId(),
            userID,
            type,
            description,
            amount,
            date
        });

        await newHistory.save();
        res.status(201).json({ message: 'History record added successfully', history: newHistory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add history record', error: error.message });
    }
});

router.get('/getHistory/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const historyRecords = await History.find({ userID });
        res.status(200).json(historyRecords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch history', error: error.message });
    }
});


router.delete('/deleteHistory/:historyId', async (req, res) => {
    const { historyId } = req.params;

    try {
        await History.findOneAndDelete({ historyId });
        res.status(200).json({ message: 'History record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete history record', error: error.message });
    }
});

module.exports = router;
