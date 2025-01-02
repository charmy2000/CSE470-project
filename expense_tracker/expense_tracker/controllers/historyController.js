const History = require('../models/history');

exports.addHistory = async (req, res) => {
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
        res.status(500).json({ message: 'Error adding history record', error: error.message });
    }
};

exports.getHistory = async (req, res) => {
    const { userID } = req.params;

    try {
        const history = await History.find({ userID });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error: error.message });
    }
};
