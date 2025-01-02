const Balance = require('../models/balance');

exports.addIncome = async (req, res) => {
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
        res.status(500).json({ message: 'Error adding income', error: error.message });
    }
};

exports.addExpense = async (req, res) => {
    const { userID, amount } = req.body;

    try {
        const balance = await Balance.findOne({ userID });
        if (!balance) {
            return res.status(400).json({ message: 'Balance record not found' });
        }

        balance.totalExpenses += amount;
        balance.availableBalance -= amount;

        await balance.save();
        res.status(200).json({ message: 'Expense deducted successfully', balance });
    } catch (error) {
        res.status(500).json({ message: 'Error deducting expense', error: error.message });
    }
};

exports.getBalance = async (req, res) => {
    const { userID } = req.params;

    try {
        const balance = await Balance.findOne({ userID });
        if (!balance) {
            return res.status(404).json({ message: 'Balance record not found' });
        }

        res.status(200).json(balance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error: error.message });
    }
};
