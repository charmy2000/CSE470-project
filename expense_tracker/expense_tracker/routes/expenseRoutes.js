const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');


router.post('/addExpense', async (req, res) => {
    const { userID, category, amount, description, date } = req.body;

    try {
        const newExpense = new Expense({
            expenseId: new mongoose.Types.ObjectId(),
            userID,
            category,
            amount,
            description,
            date
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ error: "Failed to add expense", details: error.message });
    }
});

router.get('/getExpenses/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const expenses = await Expense.find({ userID });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch expenses", details: error.message });
    }
});

router.put('/updateExpense/:expenseId', async (req, res) => {
    const { expenseId } = req.params;
    const updateData = req.body;

    try {
        const updatedExpense = await Expense.findOneAndUpdate({ expenseId }, updateData, { new: true });
        res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ error: "Failed to update expense", details: error.message });
    }
});


router.delete('/deleteExpense/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    try {
        await Expense.findOneAndDelete({ expenseId });
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete expense", details: error.message });
    }
});

module.exports = router;
