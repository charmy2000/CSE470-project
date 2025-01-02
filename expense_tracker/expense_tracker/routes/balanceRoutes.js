const express = require('express');
const router = express.Router();
const Balance = require('../models/balance');

router.post('/addIncome', async (req, res) => {
    const { userID, amount } = req.body;

    try {
        let balance = await Balance.findOne({ userID });

        if (!balance) {
            balance = new Balance({
                balanceId: new mongoose.Types.ObjectId(),
                userID,
                totalIncome: amount,
                availableBalance: amount
            });
        } else {

            balance.totalIncome += amount;
            balance.availableBalance += amount;
        }

        await balance.save();
        res.status(200).json({ message: 'Income added successfully', balance });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add income', error: error.message });
    }
});

router.post('/addExpense', async (req, res) => {
    const { userID, amount } = req.body;

    try {
        let balance = await Balance.findOne({ userID });

        if (!balance) {
            return res.status(400).json({ message: 'Balance record not found for this user' });
        }

        balance.totalExpenses += amount;
        balance.availableBalance -= amount;

        await balance.save();
        res.status(200).json({ message: 'Expense deducted successfully', balance });
    } catch (error) {
        res.status(500).json({ message: 'Failed to deduct expense', error: error.message });
    }
});


router.get('/getBalance/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const balance = await Balance.findOne({ userID });

        if (!balance) {
            return res.status(404).json({ message: 'Balance record not found for this user' });
        }

        res.status(200).json(balance);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch balance', error: error.message });
    }
});

module.exports = router;
