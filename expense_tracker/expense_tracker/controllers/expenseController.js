const Expense = require('../models/expense');


exports.addExpense = async (req, res) => {
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
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};


exports.getExpenses = async (req, res) => {
    const { userID } = req.params;

    try {
        const expenses = await Expense.find({ userID });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
};
